DROP TABLE IF EXISTS node;
CREATE TABLE node (
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


DROP TABLE IF EXISTS event;
CREATE TABLE event (
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


DROP TABLE IF EXISTS session;
CREATE TABLE session (
  id                    VARCHAR(64)           NOT NULL,
  node_id               VARCHAR(64)           NOT NULL,
  ssn_corr_id           VARCHAR(64)           NOT NULL,

  time_start            DATETIME              NOT NULL,
  time_end              DATETIME              NOT NULL,
  net_version           INT(10) UNSIGNED      NOT NULL,
  net_src_ip            DECIMAL(39,0)         NOT NULL,
  net_src_port          SMALLINT(5) UNSIGNED  NOT NULL,
  net_src_total_packets BIGINT(20) UNSIGNED   NOT NULL,
  net_src_total_bytes   BIGINT(20) UNSIGNED   NOT NULL,
  net_dst_ip            DECIMAL(39,0)         NOT NULL,
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


DROP TABLE IF EXISTS signature;
CREATE TABLE signature (
  id                    BIGINT(20) UNSIGNED   NOT NULL,
  parent_id             BIGINT(20) UNSIGNED   NOT NULL DEFAULT '0',
  type                  INT(10) UNSIGNED      NOT NULL,
  revision              SMALLINT(5) UNSIGNED  NOT NULL,
  description           TEXT                  NOT NULL,
  rule                  TEXT                  NOT NULL,
  checksum              VARCHAR(64)           NOT NULL,
  priority              SMALLINT(5) UNSIGNED  NOT NULL,
  category              SMALLINT(5) UNSIGNED  NOT NULL,
  meta                  TEXT,
  updated               DATETIME              NOT NULL,
  PRIMARY KEY (id),
  KEY parent_ix (parent_id)
);


DROP TABLE IF EXISTS host;
CREATE TABLE host (
  ip                    DECIMAL(39,0)         NOT NULL,
  type                  int(10) UNSIGNED      NOT NULL,
  type_data             TEXT                  NOT NULL,
  node_id               BIGINT(20) UNSIGNED   NOT NULL,
  port                  SMALLINT(5) UNSIGNED  NOT NULL,
  protocol              TINYINT(3) UNSIGNED   NOT NULL,
  os                    TEXT                  NOT NULL,
  os_details            TEXT                  NOT NULL,
  timestamp             DATETIME              NOT NULL,
  mac                   INT(11)               NOT NULL,
  hostname              TEXT                  NOT NULL,
  distance              SMALLINT(5) UNSIGNED  NOT NULL,
  meta                  TEXT,
  PRIMARY KEY (ip),
  KEY node_ix (node_id)
)
