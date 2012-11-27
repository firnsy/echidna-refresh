package Echidna::Database::DBI::Pdns;

use strict;
use 5.010;

use Data::Dumper;
my $model = 'Echidna::Model::Pdns';

sub create_definition {
    my ($self, $db) = @_;

    my $sql = q{
      CREATE TABLE IF NOT EXISTS pdns (
        id                    VARCHAR(64)           NOT NULL,
        node_id               VARCHAR(64)           NOT NULL,

        timestamp             DATETIME              NOT NULL,
        client                DECIMAL(39,0)         NOT NULL,
        server                DECIMAL(39,0)         NOT NULL,
        rr_class              TEXT,
        query                 TEXT,
        query_answer          TEXT,
        query_type            TEXT,
        answer                TEXT,
        ttl                   INT(10) UNSIGNED      NOT NULL,
        PRIMARY KEY (id),
        KEY node_ix (node_id)
      );
    };

    $db->execute($sql, sub {
        my ($rs, $err) = @_;

        die "Failed to create table $err" if $err;
    });
}

1;
