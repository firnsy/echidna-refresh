package Echidna::Database::DBI::Node;

use strict;
use 5.010;

use Data::Dumper;
my $model = 'Echidna::Model::Node';

sub create_definition {
    my ($self, $db) = @_;

    my $sql = q{
      CREATE TABLE IF NOT EXISTS node (
        id                    VARCHAR(64)           NOT NULL,
        type                  TEXT                  NOT NULL,
        host                  DECIMAL(39,0)         NOT NULL,
        port                  SMALLINT(5)           NOT NULL,
        skey                  TEXT                  NOT NULL,
        name                  TEXT                  NOT NULL,
        network               TEXT                  NOT NULL,
        status_state          INT(10) UNSIGNED      NOT NULL,
        status_timestamp      DATETIME              NOT NULL,
        conf                  TEXT,
        description           TEXT,
        PRIMARY KEY (id)
      );
    };

    $db->execute($sql, sub {
        my ($rs, $err) = @_;

        die "Failed to create table $err" if $err;
    });
}

1;
