package Echidna::Database::Query::SQLRead;

use strict;
use 5.010;

use base qw(Echidna::Database::Query);
use Data::Dumper;
use Scalar::Util qw(looks_like_number);
use Carp;

=for comment
  my $query = Echidna::Database::Query->load('SQL');

  $query->table('session');
  $query->limit(10);
  $query->offset(5);
  $query->where({
      field1 => 'foo',
      field2 => 'bar',
      {
        field3 => {
          lte => 10,
        }
      }
    });
  $query->render();
=cut

sub new {
  my ($self) = @_;

  return bless {
    __table    => undef,
    __offset   => 0,
    __limit    => 100,
    __order_by => undef,
    __group_by => undef,
    __fields   => [],
    __params   => [],
    __criteria => {},
    __sql      => ''
  }, __PACKAGE__;
}

sub params { shift->{__params} // [] }

sub fields {
  my ($self, $fields) = @_;

  return $self->{__fields} unless defined $fields;

  if (ref $fields eq 'ARRAY' and scalar @$fields > 0) {
    $self->{__fields} = $fields;
  } 
  else { 
    carp 'Invalid fields, expected ARRAYREF on ' .__PACKAGE__. '. Got ' .ref $fields;
  }

  return $self;
}

sub table {
  my ($self, $table) = @_;

  return $self->{__table} unless defined $table;

  if (defined $table and $table ~~ /\A[a-z0-9_]+\Z/i) {
    $self->{__table} = $table;
  }
  else { 
    carp 'Invalid table name on ' .__PACKAGE__. '. Got ' .$table;
  }

  return $self;
}

sub offset {
  my ($self, $offset) = @_;

  return $self->{__offset} unless defined $offset;

  if (looks_like_number($offset)) {
    $self->{__offset} = $offset;
  } 
  else { 
    carp 'Invalid offset number on ' .__PACKAGE__. '. Got ' .$offset;
  }

  return $self;
}

sub limit {
  my ($self, $limit) = @_;

  return $self->{__limit} unless defined $limit;

  if (looks_like_number($limit)) {
    $self->{__limit} = $limit;
  } 
  else { 
    carp 'Invalid limit number on ' .__PACKAGE__. '. Got ' .$limit;
  }

  return $self;
}

sub order_by {
  my ($self, $field) = @_;

  return $self->{__order_by} unless defined $field;

  if ($field ~~ @{ $self->{__fields} }) {
    $self->{__order_by} = $field;
  } 

  return $self;
}

sub group_by {
  my ($self, $field) = @_;

  return $self->{__group_by} unless defined $field;

  if ($field ~~ @{ $self->{__fields} }) {
    $self->{__group_by} = $field;
  } 

  return $self;
}

sub where {
  my ($self, $criteria) = @_;

  if (ref $criteria eq 'HASH') {
    $self->{__criteria} = $criteria;
  }

  return $self;
}

sub _add_criteria {
  my ($self) = @_;

  if (ref $self->{__criteria} eq 'HASH') {

    # clean params used for paramaterized queries
    if (scalar @{ $self->{__params} } > 0 ) {
      $self->{__params} = [];
    }

    return $self->create_filter( $self->{__criteria} );
  }

  return '';
}

sub quote {
  my ($self, $msg) = @_;

  $msg =~ s/'/''/;
}

sub render {
  my ($self) = @_;

  # check fields
  unless (defined $self->{__fields} or ref $self->{__fields} eq 'ARRAY') {
    
  }

  # validate table name
  unless (defined $self->{__table} or $self->{__table} ~~ /\A[a-z0-9_]+\Z/i) {
    
  }

  # validate group by and order by

  my $sql = ['SELECT'];

  if (scalar @{ $self->fields } > 0) {
    push @$sql, join(', ', @{ $self->fields });
  }
  else { push @$sql, '*'; }

  push @$sql, join(' ', ('FROM', $self->table));

  push @$sql, $self->_add_criteria();
  
  push @$sql, join(' ', ('GROUP BY', $self->group_by)) if defined $self->group_by; 
  push @$sql, join(' ', ('ORDER BY', $self->order_by)) if defined $self->order_by; 

  push @$sql, join(' ', ('LIMIT',  $self->limit)) if looks_like_number($self->limit);

  if (/LIMIT/ ~~ $sql and looks_like_number($self->offset)) {
     push @$sql, join(' ', ('OFFSET', $self->offset));
  }

  return join(' ', @$sql);
}

1;
