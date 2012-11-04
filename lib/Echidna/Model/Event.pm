package Echidna::Model::Event;

use strict;
use 5.010;

use base qw(Echidna::Model::Object);

__PACKAGE__->set_properties({
    id             => ['int'],
    node_id        => ['text'],
    net_src_ip     => ['ip'],
    net_src_port   => ['int'],
    net_dst_ip     => ['ip'],
    net_dst_port   => ['int'],
    net_protocol   => ['int'],

    timestamp      => 'timestamp',
    classification => 'text',
    net_version    => 'int',
    sig_id         => 'int',
    sig_revision   => 'int', 
    sig_priority   => 'int',
    sig_message    => 'text',
    sig_category   => 'text',
    meta           => 'text',
});

1;

