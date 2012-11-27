package Echidna::Database::DBI::Session;

use strict;
use 5.010;

use Data::Dumper;
my $model = 'Echidna::Model::Session';

# function for demostration purpose
sub longest_session {
    my ($self, $db, $args, $cb) = @_;

    $db->execute_query("SELECT * FROM session ORDER BY time_duration DESC LIMIT 1", $model, sub {
        $cb->(@_);
    });
}

sub create_definition {
    my ($self, $db) = @_;

    my $sql = q{
      CREATE TABLE IF NOT EXISTS session (
        id                    VARCHAR(64)           NOT NULL,
        node_id               VARCHAR(64)           NOT NULL,
        ssn_corr_id           VARCHAR(64)           NOT NULL,

        time_start            DATETIME              NOT NULL,
        time_end              DATETIME              NOT NULL,
        net_version           INT(10) UNSIGNED      NOT NULL,
        net_src_ip            VARCHAR(39)           NOT NULL,
        net_src_port          SMALLINT(5) UNSIGNED  NOT NULL,
        net_src_total_packets BIGINT(20) UNSIGNED   NOT NULL,
        net_src_total_bytes   BIGINT(20) UNSIGNED   NOT NULL,
        net_dst_ip            VARCHAR(39)           NOT NULL,
        net_dst_port          SMALLINT(5) UNSIGNED  NOT NULL,
        net_dst_total_packets BIGINT(20) UNSIGNED   NOT NULL,
        net_dst_total_bytes   BIGINT(20) UNSIGNED   NOT NULL,
        net_protocol          TINYINT(3) UNSIGNED   NOT NULL,
        timestamp             DATETIME,
        time_duration         BIGINT(20) UNSIGNED,
        net_src_flags         TINYINT(3) UNSIGNED,
        net_dst_flags         TINYINT(3) UNSIGNED,
        file_name_start       TEXT,
        file_offset_start     BIGINT(20)            DEFAULT NULL,
        file_name_end         TEXT,
        file_offset_end       BIGINT(20)            DEFAULT NULL,
        meta                  TEXT,
        meta_cxt_id           TEXT,
        PRIMARY KEY (id),
        KEY node_ix (node_id),
        KEY ssn_corr_ix (ssn_corr_id)
      );
    };

    $db->execute($sql, sub {
        my ($rs, $err) = @_;

        die "Failed to create table $err" if $err;
    });
}

1;
