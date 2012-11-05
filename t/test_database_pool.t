#!/usr/bin/perl -w

use strict;
use 5.010;

use lib '../lib';
use AnyEvent;
use Data::Dumper;
use File::Spec;
use FindBin qw($Bin);
use Test::More 'no_plan';



use_ok 'Echidna::Database';

my $db = Echidna::Database->new( dbi => {
    type      => 'mysql',
    name      => 'echidna',
    user      => 'echidna',
    pass      => 'ech1dna',
    pool_size => 10,
    debug => 1,
});

my $cv = AE::cv;

my $result = {};
$cv->begin( sub { shift->send( $result ) } );

for my $i (1..10) {
    say "Invodking $i ...";
    $cv->begin;
    $db->execute("SELECT SLEEP(5)", sub {
        say "Done $i";
        $result->{$i} = 1;
        $cv->end;
    });
}

$cv->end;
$cv->recv;

ok( scalar keys %$result == 10, "Should be 10 results available." );

$db->close();
