package Echidna::Database::DBI::Event;

use strict;
use 5.010;

my $model = 'Echidna::Model::Event';

sub get_max_id {
    my ($self, $db, $args, $cb) = @_;

    my $where = '';

    if ( defined($args->{node_id} ) )
    {
      $where = ' WHERE node_id=' . $args->{node_id};
    }

    $db->execute_query("SELECT * FROM event" . $where . " ORDER BY id DESC LIMIT 1", $model, sub {
        $cb->(@_);
    });
}

sub create_definition {
    my ($self, $db) = @_;

    my $sql = q{
      CREATE TABLE IF NOT EXISTS event (
        id                    VARCHAR(64)           NOT NULL,
        node_id               VARCHAR(64)           NOT NULL,
        evt_corr_id           VARCHAR(64)           NOT NULL,
        ssn_corr_id           VARCHAR(64)           NOT NULL,
        net_version           INT(10) UNSIGNED      NOT NULL,
        net_src_ip            DECIMAL(39,0)         NOT NULL,
        net_src_port          SMALLINT(5) UNSIGNED  NOT NULL,
        net_dst_ip            DECIMAL(39,0)         NOT NULL,
        net_dst_port          SMALLINT(5) UNSIGNED  NOT NULL,
        net_protocol          TINYINT(3) UNSIGNED   NOT NULL,
        timestamp             DATETIME              NOT NULL,
        sig_type              INT(10) UNSIGNED      NOT NULL,
        sig_id                BIGINT(20) UNSIGNED   NOT NULL,
        sig_revision          INT(10) UNSIGNED      NOT NULL,
        sig_category          INT(10) UNSIGNED      NOT NULL,
        sig_priority          INT(10) UNSIGNED      NOT NULL,
        classification        INT(10) UNSIGNED      NOT NULL,
        sig_message           TEXT,
        meta                  TEXT,
        meta_by2_event_id     BIGINT(20) UNSIGNED,
        PRIMARY KEY (id),
        KEY evt_corr_ix (evt_corr_id),
        KEY ssn_corr_ix (ssn_corr_id)
      );
    };

    $db->execute($sql, sub {
        my ($rs, $err) = @_;

        die "Failed to create table $err" if $err;
    });
}

1;
