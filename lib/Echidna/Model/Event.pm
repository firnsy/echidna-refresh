package Echidna::Model::Event;

use strict;
use 5.010;

use base qw(Echidna::Model::Object);

__PACKAGE__->set_properties({
    # required

    # sha256(concat(timestamp,net_src_ip,net_src_port,net_dst_ip,net_dst_port,net_protocol))
    id                => ['sha256'],
    node_id           => ['sha256'],

    # sha256(concat(net_src_ip,net_src_port,net_dst_ip,net_dst_port,net_protocol,sig_type,sig_id,sig_revision))
    evt_corr_id       => ['sha256'],

    # sha256(concat(net_src_ip,net_src_port,net_dst_ip,net_dst_port,net_protocol))
    ssn_corr_id       => ['sha256'],

    net_version       => ['int'],
    net_src_ip        => ['ip'],
    net_src_port      => ['int'],
    net_dst_ip        => ['ip'],
    net_dst_port      => ['int'],
    net_protocol      => ['int'],

    timestamp         => ['timestamp'],
    sig_type          => ['int'],
    sig_id            => ['int'],
    sig_revision      => ['int'], 
    sig_category      => ['text'],
    sig_priority      => ['int'],
    classification    => ['text'],

    # optional
    sig_message       => 'text',

    # optional - application specific
    meta              => 'text',
    meta_by2_event_id => 'any',
});

1;

