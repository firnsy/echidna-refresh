package Echidna::Model::Pdns;

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

    timestamp             => ['timestamp'],
    client                => ['ip'],
    server                => ['ip'],
    rr_class              => ['text'],
    query                 => ['text'],
    query_type            => ['text'],
    answer                => ['text'],
    ttl                   => ['int'],
});

1;

