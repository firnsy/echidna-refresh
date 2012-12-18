package Echidna::Database::DBI;

use strict;
use 5.010;

use base qw(Echidna::Database::Base);
use Module::Pluggable
    search_path => 'Echidna::Database::DBI',
    sub_name => 'entities',
    except => qr/Object$/;

use AnyEvent;
use AnyEvent::DBI;
use Carp;
use DBI;
use Scalar::Util qw(looks_like_number);

use Data::Dumper;
use Echidna::Model;
use Echidna::Common::Util;
use Echidna::Common::Error;

use Echidna::Database::Query::SQLRead;

my $instance;
sub new {
    my ($class, $args) = @_;

    unless (ref $instance eq __PACKAGE__) {
        $instance = bless {
            __debug   => 0,
            __pool    => {}, # handles hash
            __idle    => [], # handle pids idle
            __running => {}, # handle pids running
            __counter => 0,  #
            __total   => 0,  # handles created
            __return_objects => 0,
            __loaded_models => [],
        }, $class;

        $instance->_setup($args);
    }

    $instance;
}

sub _setup {
    my ($self, $args) = @_;

    if ( ! ref($args) ) {
        warn "Expected ref args";
    };

    $instance->{__total} = $args->{pool_size} // 10;
    croak "Size should be an integer"
        unless $instance->{__total} ~~ /\d+/;

    croak "Driver type not found!"   if ( ! defined($args->{type}) );
    croak "Database name not found!" if ( ! defined($args->{name}) );
    croak "User not found!"          if ( ! defined($args->{user}) );
    croak "Password not found!"      if ( ! defined($args->{pass}) );

    # dsn
    my $dtype               = $args->{type};
    my $database            = $args->{name};
    $instance->{__user}     = $args->{user};
    $instance->{__password} = $args->{pass};
    $instance->{__debug}    = $args->{debug} // 0;

    $instance->{__dsn} = join(":", "dbi", $args->{type}, $args->{name});

    # perform a credentials check before we build the pool
    if ( ! DBI->connect( $instance->{__dsn}, $instance->{__user}, $instance->{__password} ) ) {
        croak "Error - Unable to connect with those credentials";
    }

    for (1..$instance->{__total}) {
        my $dbi = new AnyEvent::DBI
                      $instance->{__dsn},
                      $instance->{__user},
                      $instance->{__password},
                      PrintError => 0,
                      on_error => sub {
                          my ($dbh, $location, $line, $fatal) = @_;

                          say "dbh is dead we need to take care of this" if $fatal;
                          #$self->return_handle($dbh);
                          carp "DBI Error: $@ at $location:$line" if $self->{__debug};

                      };

        if( $dtype eq 'mysql' ) {
            # enabling mysql reconnect
            $dbi->attr('mysql_auto_reconnect', 1, sub {});
        }

        $instance->{__pool}->{$dbi->{child_pid}} = $dbi;

    }

    my @pids = keys %{ $instance->{__pool} };

    if (scalar @pids < 1) {
        croak "Error - Failed to create database handlers";
    }

    $instance->{__idle} = \@pids;
    $instance->{__running}->{$_} = 0 for @pids;

    $instance->_autoload_models();
    $instance->_autoload_types();
}

sub close {
    my $self = shift;

    for my $dbh ( keys %{ $self->{__pool} } ) {;
        say "Cleaning DBI pid: " . $dbh if ( $self->{__debug} );
        delete( $self->{__pool}{ $dbh } );
    }
}

sub DESTROY {
  shift->close();
}

sub pool_size {
    my $self = shift;
    keys %{ $self->{__pool} } // croak;
}

sub running_pids {
  my ($self) = @_;

  my @running = ();
  @running = grep {
    my $idx   = $_;
    my $count = $self->{__running}->{$idx};

    $idx if $count > 0;

  } sort keys %{ $self->{__running} };

  return \@running;
}

sub print_pool_stats {
  my ($self) = (@_);

  say "\nCounter:      " .$self->{__counter};
  say "Idle:         [", join(", ", sort @{$self->{__idle}}), "]";

  my $running_pids = $self->running_pids();

  if (scalar @$running_pids < 1) {
    $running_pids = 'no running pids';
  } else {
    $running_pids = join(", ", @{ $self->running_pids() });
  }

  say "Running:      [", $running_pids, "]";
  say "-"x76;
}

sub fetch {
    my $self = shift;

    say "\n-> CALL: fetch\n" if $self->{__debug};

    my $pid = shift @{ $self->{__idle} } // $self->_reuse_pid;
    my $dbh = $self->{__pool}->{$pid};

    $self->{__running}->{$pid} += 1;

    unless (ref $dbh eq 'AnyEvent::DBI') {
        croak "HandleFetchError - Could not fetch valid handler";
    }

    if ($self->{__debug}) {
        say "Selected PID: " .$dbh->{child_pid};
        $self->print_pool_stats();
    }

    return $dbh;
}

sub _reuse_pid {
    my ($self) = @_;

    my @pids = sort keys %{ $self->{__running} };
    $self->{__counter} %= $self->{__total};
    my $pid = $pids[$self->{__counter}];
    $self->{__counter} += 1;

    say "Reusing pid $pid" if $self->{__debug};

    return $pid;
}

sub _execute_query {
    my ($self, $sql, $params, $model, $cb, $fields) = @_;

    $self->execute($sql, $params, sub {
        my ($rs, $error) = @_;

        croak 'Expected Callback' unless ref $cb eq 'CODE';

        return $cb->(undef, $error) if defined $error;

        my @result = map {
            $self->_map_properties($model, $_, $fields)
        } @$rs;

        $cb->(\@result, undef);
    });
}

sub execute {
    my ($self, $sql, $params, $cb) = @_;

    my $dbh = $self->fetch;
    my $cv  = AE::cv;

    # execute callback if defined
    $cv->cb(sub {
        my ($rs, $error) = shift->recv;

        $cb->($rs, $error);

    }) if ref $cb eq 'CODE';

    # execute query
    my $wrap_cb = sub {
        my ($dbh, $rows, $rv) = @_;

        # on failure
        unless ($#_) {
          $cv->send($dbh, $@);
        }

        $self->return_handle($dbh, $sql)
            or croak "Failed to return handler $@";

        $cv->send($rows);
    };

    if (ref $params eq 'ARRAY' and scalar @$params > 0) {
      $dbh->exec($sql, @$params, $wrap_cb);
    } 
    else {
      $dbh->exec($sql, $wrap_cb);
    }

    $cv;
}

sub search {
    my ($self, $model_type, $criteria, $cb) = @_;

    my $query = Echidna::Database::Query::SQLRead->new;

    for my $option ('limit', 'offset') {
      if (looks_like_number($criteria->{$option})) {
        $query->$option($criteria->{$option});
        delete $criteria->{$option};
      }
    }

    my $model = $self->_load_model($model_type);
    my $table = lc $1 if $model =~ /::(\w+)$/;

    my $fields = $model->attributes;

    if (exists $criteria->{fields}) {
      if (ref $criteria->{fields} eq 'ARRAY' and scalar @{ $criteria->{fields} } > 0) {
        $fields = $self->_clean_attributes($model, $criteria->{fields});
      }

      delete $criteria->{fields};
    }

    # Note: This method cleans criteria according to the model attributes
    $self->_validate_criteria($model, $criteria);

    $query->fields($fields)
          ->table($table)
          ->where($criteria);

    my $sql    = $query->render;
    my $params = $query->params;

    #say "SQL:    $sql";
    #say "Params: " .Dumper $params;
    $self->_execute_query($sql, $params, $model, $cb, $fields);
}

sub count {
    my ($self, $model_type, $cb) = @_;

    croak "ModelNotFound - The model requested does not exist"
        unless 'Echidna::Model::' .ucfirst($model_type) ~~ [Echidna::Model->objects];

    $self->_execute_query("SELECT COUNT(*) FROM $model_type", undef, $cb);
}

sub map_objects {
    my ($self, $enable) = @_;

    if ($enable) {
        $self->{__return_objects} = 1;
    } else {
        $self->{__return_objects} = 0;
    }
}

sub return_handle {
    my ($self, $dbh, $sql) = @_;

    croak 'Error - Failed to close db handle'
        unless ref $dbh eq 'AnyEvent::DBI';

    my $pid = $dbh->{child_pid};

    my $idx = 0;
    for my $pid_running (sort keys %{ $self->{__running} }) {
        last if $pid_running ~~ qr/\A$pid\Z/;
        $idx += 1;
    }

    if ($self->{__running}->{$pid} < 1) {
        warn "Handle $pid is already free";
        return 1;
    }

    $self->{__running}->{$pid} -= 1;
    if ($self->{__running}->{$pid} == 0) {
        push @{ $self->{__idle} }, $pid."";
    }

    say "Handle $pid is back in the pool just ran $sql" if $self->{__debug};
    $self->print_pool_stats() if $self->{__debug};

    1;
}

sub _autoload_models {
    my ($self) = @_;

    for my $model_path (Echidna::Model->objects) {
        $self->_require_model($model_path);

        next;
        my $table  = lc $1 if $model_path =~ /::(\w+)$/;
        my $db_def = __PACKAGE__ .'::'.  ucfirst($table);

        (my $file_path = $db_def) =~ s/::/\//;
        $file_path .= ".pm";

        return 1 unless -f $file_path;

        eval qq{require $db_def}; if ($@) {
            throw 'SchemaDefError', $@;
        }

        my $create_sql = _$db_def->get_table_definition;
        #$self->_execute_query($create_sql, undef, undef);
    }

}

sub _autoload_types {
    my ($self) = @_;

    for my $package (__PACKAGE__->entities) {
        $self->_require($package) 
            or croak "Failed to require $package";

        $package->create_definition($self);
    }
}

sub _require {
    my ($self, $lib) = @_;
    return unless $lib;

    eval qq{require $lib}; if ($@) {
        throw "Could not require $lib";
    }

    $lib;
}

sub _require_model {
    my ($self, $model_path) = @_;

    eval {
        $self->_require($model_path);

    }; if ($@) {
        throw 'ModelNotFound', $@;
    }

    push @{ $self->{__loaded_models} }, $model_path;
}

sub _load_model {
    my ($self, $model) = @_;

    my $model_path = 'Echidna::Model::' .ucfirst($model);
    unless ($model_path ~~ $self->{__loaded_models}) {
        eval qq{require $model_path}; if ($@) {
            throw "Failed to load $model_path [$@]";
        }
    }

    return $model_path;
}

sub _clean_criteria {
    my ($model, $criteria) = @_;

    for my $key (keys %$criteria) {
        delete $criteria->{$key} unless $key ~~ $model->attributes;
    }

    return $criteria;
}

sub _mk_query_count {
    my ($self, $model, $criteria) = @_;

    my $table = lc $1 if $model =~ /::(\w+)$/;
    $criteria = _clean_criteria($model, $criteria);

    return "SELECT COUNT(*) FROM " .$table. " " .$self->create_filter($criteria);
}

sub _mk_query_insert {
    my ($self, $object) = @_;

    my @fields = sort keys %{ $object->properties };
    my @values = map { "'".$object->get($_)."'" } @fields;
    my $model = ref $object;
    my $table = lc $1 if $model =~ /::(\w+)$/;

    unless (scalar @fields > 0 and scalar @values > 0 and scalar @fields == scalar @values) {
        throw "Insert query fail Fields:[@fields] Values [@values]";
    }

    return "INSERT INTO " .lc $table. "(".join(", ", @fields). ") VALUES(" .join(", ", @values). ")";
}

sub _mk_batch_insert {
    my ($self, $collection) = @_;

    my $model = undef;
    my $table = undef;

    my @fields = ();
    my $values = [];

    my $sql = '';
    my $query = "INSERT INTO %s (%s) VALUES";
    if (ref $collection eq 'ARRAY') {

        for my $object (@$collection) {
  
            $model = ref $object unless defined $model;
            $table = lc $1 if ! defined $table and $model =~ /::(\w+)$/;
            
            unless (scalar @fields > 0) {
                @fields = sort keys %{ $object->properties };
            }

            my @val = map { $object->get($_) } @fields; 
            push @$values, \@val;
        }
    }

    if (scalar @fields > 0) {
        $sql = sprintf($query, lc $table, join(",", @fields) );

        my $c = 0;
        for my $value (@$values) {
            $sql .= '(' .join(",", map { "'" .$_. "'"}@$value). ')';

            $c += 1;
            $sql .= ',' unless $c == scalar @$values;
        }
    }

    $sql;
}

sub _mk_query_update {
    my ($self, $model, $criteria, $data) = @_;

    my $table = lc $1 if $model =~ /::(\w+)$/;

    $data     = _clean_criteria($model, $data);
    $criteria = _clean_criteria($model, $criteria);

    unless (ref $data eq 'HASH' and keys %$data > 0) {
        throw "Expected non empty arguments as hashref on query update";
    }

    my $query = "UPDATE $table SET ";

    my @pairs;
    for my $key (keys %{ $data }) {
        push @pairs, "$key = '$data->{$key}'";
    }

    $query .= join(", ", @pairs);
    $query .= " " .$self->create_filter($criteria);
}

sub _map_properties {
    my ($self, $model, $row, $fields) = @_;

    return $row unless $model;

    my $hash = {};

    if (ref $fields eq 'ARRAY' and scalar @$fields > 0) {
      if (scalar @$fields != scalar @$row) {
        warn "Something is seriously wrong here, fields and result values should be equal in size. " .__PACKAGE__. '->_map_properties ';
      }

      for my $field (@$fields) {
        $hash->{$field} = shift @$row if $field ~~ $model->attributes;
      }
    }
    else {
      $hash->{$_} = shift @$row for @{ $model->attributes };
    }

    return $model->new($hash) if $self->{__return_objects};

    $hash
}

sub _clean_attributes {
  my ($self, $model, $attributes) = @_;

  unless (ref $attributes eq 'ARRAY') {
    croak 'Expected arrayref as attributes';
  }

  my $clean = [];
  for my $attr (@$attributes) {
    if (grep $attr, @{ $model->attributes }) {
      push @$clean, $attr;
    }
  }

  return $clean;
}

sub _validate_criteria {
    my ($self, $model, $criteria) = @_;

    for my $key (keys %$criteria) {
        delete $criteria->{$key} unless $key ~~ $model->attributes;
    }

    eval {
        $model->validate($criteria);
    }; if ($@) {
        throw $@->message;
    }
}

sub _validate_object {
    my ($self, $model, $object) = @_;

    my @required = grep {
        $_ if ref $model->properties->{$_} eq 'ARRAY'
    } @{ $model->attributes };

    for my $key (keys %{ $model->properties }) {
        if ($key ~~ @required) {
            my $type  = shift @{ $model->properties->{$key} };
            my $value;
            if (ref $object eq $model) {
                $value = $object->get($key);
            }
            else {
                $value = $object->{$key};
            }

            $model->validate_type($type, $key, $value);
        }
    }
}

sub insert {
    my ($self, $model_type, $data, $cb) = @_;

    my $model = $self->_load_model($model_type);

    eval { $self->_validate_object($model, $data); }; 
    throw $@->message if $@;

    my $sql = $self->_mk_query_insert($data);
    $self->_execute_query($sql, undef, undef, $cb);
}

sub batch_insert {
    my ($self, $model_type, $collection, $cb) = @_;

    my $model = $self->_load_model($model_type);

    for my $data (@$collection) {
        eval { $self->_validate_object($model, $data); };
        throw $@->message .' on '. Dumper($data) if $@;
    }

    my $sql = $self->_mk_batch_insert($collection);
    $self->_execute_query($sql, undef, undef, $cb);
}

sub update {
    my ($self, $model_type, $criteria, $data, $cb) = @_;

    my $model = $self->_load_model($model_type);
    $criteria = _clean_criteria($model, $criteria);

    eval {
        $model->validate($criteria);
        $model->validate($data);

    }; if ($@) {
        throw $@->message;
    }

    my $sql = $self->_mk_query_update($model, $criteria, $data);

    $self->_execute_query($sql, undef, undef, $cb);
}

sub delete {
    my ($self, $model, $data) = @_;

    throw "Not implemented yet";
}

sub create_filter {
    my ($self, $filter) = @_;

    if ( ref $filter ne 'HASH' or ! keys %$filter) {
        return '';
    }

    return 'WHERE ' . $self->create_filter_from_hash($filter);
}

sub create_filter_from_hash {
    my ($self, $value, $field, $parent_field) = @_;

    if ( defined( $field ) ) {
        $value = $value->{$field};
    }

    my @fields  = keys( %{ $value } );

    return '' if ( @fields == 0 );

    my @where = ();
    my $connect = 'AND';
    my $conditional = '=';

    # build up the search criteria
    for my $f ( @fields ) {
        my $criteria = '';

        given( $f ) {
            when(/\$eq/) { $conditional = '='; }
            when(/\$ne/) { $conditional = '!='; }
            when(/\$lte/) { $conditional = '<='; }
            when(/\$lt/) { $conditional = '<'; }
            when(/\$gte/) { $conditional = '>='; }
            when(/\$gt/) { $conditional = '>'; }
        }

        if ( ref($value->{$f}) eq 'ARRAY' )
        {
            my $c = $self->create_filter_from_array($value, $f, $field);
            push( @where, $c ) if ( length($c) );
        }
        elsif ( ref($value->{$f}) eq 'HASH' )
        {
            my $c = $self->create_filter_from_hash($value, $f, $field);
            push( @where, $c ) if ( length($c) );
        }
        else {
            my $c = $self->create_filter_from_scalar($value->{$f}, $f, $field, $conditional);
            push( @where, $c ) if ( length($c) );
        }
    }

    return '(' . join(" $connect ", @where) . ')';
}

sub create_filter_from_array {
    my ($self, $value, $field, $parent_field) = @_;

    if ( defined( $field ) ) {
        $value = $value->{$field};
    }

    my @fields = @{ $value };

    return '' if ( @fields == 0 );

    my @where = ();
    my $connect = '';

    given( $field ) {
        when(/\$nor/) { $connect = 'NOT OR'; $field = undef; }
        when(/\$or/)  { $connect = 'OR'; $field = undef; }
        when(/\$and/) { $connect = 'AND'; $field = undef; }
        when(/\$in/)  {
            return '(' . $parent_field . ' IN (' . join(",", @{ $value }) . '))';
        }
        when(/\$nin/) {
            return '(' . $parent_field . ' NOT IN (' . join(",", @{ $value }) . '))';
        }
    }

    # build up the search criteria
    for my $f ( @fields ) {
        my $criteria = '';

        if ( ref($f) eq 'ARRAY' )
        {
            my $c = $self->create_filter_from_array($f, $field);
            push( @where, $c ) if ( length($c) );
        }
        elsif ( ref($f) eq 'HASH' )
        {
            my $c = $self->create_filter_from_hash($f, $field);
            push( @where, $c ) if ( length($c) );
        }
    }

    return '(' . join(" $connect ", @where) . ')';
}

sub create_filter_from_scalar {
    my ($self, $value, $field, $parent_field, $conditional) = @_;

    $conditional //= '=';
    $field = $parent_field if ( $field =~ /^\$/ );

    if ( $value =~ m/[^\d]/ ) {
        return $field . $conditional . "'$value'";
    }

    return $field . $conditional . "'$value'";
}

1;
