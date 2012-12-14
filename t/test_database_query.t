#!/usr/bin/perl 

use strict;
use 5.010;

use lib '../lib';
use Data::Dumper;
use Test::More 'no_plan';
use AnyEvent;

use_ok 'Echidna::Database::Query::SQL';

my $query = Echidna::Database::Query::SQL->new;
isa_ok($query, 'Echidna::Database::Query::SQL');

$query->table('session');
ok($query->table ~~ 'session', 'TABLE Check');

$query->fields(['field1', 'field2', 'field3']);
ok($query->fields ~~ ['field1', 'field2', 'field3'], 'FIELDS Check');

$query->limit(10);
ok($query->limit ~~ 10, 'LIMIT Check');

$query->offset(3);
ok($query->offset ~~ 3, 'OFFSET Check');

$query->where({
    field1 => 1,
    field2 => { '$gte' => 10, '$lte' => 20 },
    field3 => { '$lte' => 5  },
  });
$query->group_by('field1');
$query->order_by('field2');

my $sql = q{SELECT 'field1', 'field2', 'field3' FROM session WHERE (field1=? AND (field2<=? AND field2>=?) AND (field3<=?)) GROUP BY field1 ORDER BY field2 LIMIT 10 OFFSET 3};
ok( $sql ~~ $query->render, 'SQL Str');
ok([1, 20, 10, 5] ~~ $query->params, 'PARAMS Check');

my $query2 = Echidna::Database::Query::SQL->new;
$query2->table('event')
       ->offset('2')
       ->limit(10);

ok('SELECT * FROM event  LIMIT 10 OFFSET 2' eq $query2->render, 'SQL Query Check 2');
