package Echidna::Database;

use strict;
use 5.010;

#use EV;
use AnyEvent;
use Data::Dumper;
use Echidna::Database::Pool::MySQL;


my $instance;
sub new {
  unless ($instance) {
    $instance = bless {
      __dbh => undef,
    }, __PACKAGE__
  }
  $instance->{__dbh} = Echidna::Database::Pool::MySQL->new();

  return $instance;
}

sub search {
    my ($self, $params) = @_;

    my $dbi = $self->{__dbh}->fetch();
    for my $source (keys %$params) {
        say "Searching $source";

        say Dumper $params->{$source};
    }
}

sub sleep {
    my ($self, $cb) = @_;
    my $w; $w = AE::timer 3, 0, sub { $cb->(); undef $w };
}

sub get_agents {
    my $self = shift;
    my $cv = AE::cv;

    my $dbi = $self->{__dbh}->fetch;
    my $query = "SELECT name, description, ip, updated FROM agent";
    $dbi->exec($query, sub {
        my ($dbh, $rows, $rv) = @_;
        $cv->send($rows);
    });

    $cv->wait;
}

1;
