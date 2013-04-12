package Echidna::Database::DBI::User;

use strict;
use 5.010;

use Data::Dumper;
use Echidna::Model::User;
my $model = 'Echidna::Model::User';

sub create_definition {
    my ($self, $db) = @_;

    my $sql = q{
      CREATE TABLE IF NOT EXISTS user (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `username` varchar(15) NOT NULL,
        `password` varchar(30) NOT NULL,
        PRIMARY KEY (id),
      );
    };

    $db->execute($sql, sub {
        my ($rs, $err) = @_;

        die "Failed to create table $err" if $err;
    });
}

1;
