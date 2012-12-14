package Echidna::Database::Query;

use strict;
use 5.010;

use Carp;

sub new {
  croak 'Override on Query subclass';
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
        push @{ $self->{__params} }, $value;
        return $field . $conditional . "?";
    }

    push @{ $self->{__params} }, $value;
    return $field . $conditional . "?";
}

1;
