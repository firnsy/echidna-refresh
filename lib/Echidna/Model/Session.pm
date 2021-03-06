package Echidna::Model::Session;

use strict;
use 5.010;

use base qw(Echidna::Model::Object);

__PACKAGE__->set_properties({
    # required

    # sha256(concat(net_src_ip,net_src_port,net_dst_ip,net_dst_port,net_protocol,time_start,time_end))
    id                    => ['sha256'],
    node_id               => ['sha256'],

    # sha256(concat(net_src_ip,net_src_port,net_dst_ip,net_dst_port,net_protocol))
    ssn_corr_id           => ['sha256'],

    time_start            => ['timestamp'],
    time_end              => ['timestamp'],
    net_version           => ['int'],
    net_src_ip            => ['ip'],
    net_src_port          => ['int'],
    net_dst_ip            => ['ip'],
    net_dst_port          => ['int'],
    net_protocol          => ['int'],
    net_src_total_bytes   => ['int'],
    net_dst_total_bytes   => ['int'],
    net_src_total_packets => ['int'],
    net_dst_total_packets => ['int'],

    # optional
    timestamp             => 'timestamp',
    time_duration         => 'int',
    net_src_flags         => 'int',
    net_dst_flags         => 'int',
    file_name_start       => 'text',
    file_offset_start     => 'int',
    file_name_end         => 'text',
    file_offset_end       => 'int',

    # optional - application specific
    meta                  => 'any',
    meta_cxt_id           => 'any',
});

sub order_attr {
  return 'time_start';
}

sub range_attrs { ['time_start', 'time_end'] }

1;
