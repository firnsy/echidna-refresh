package Echidna::Model::Session;

use strict;
use 5.010;

use base qw(Echidna::Model::Object);

__PACKAGE__->set_properties({
    # required
    id                    => ['int'],
    node_id               => ['sha256'],
    time_start            => ['datetime'],
    time_end              => ['datetime'],
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
    timestamp          => 'timestamp',
    time_duration      => 'text',
    net_version        => 'int',
    net_src_flags      => 'int',
    net_dst_flags      => 'int',
    file_name_start    => 'text',
    file_offset_start  => 'any',
    file_name_end      => 'text',
    file_offset_end    => 'any',
    meta          => 'any',
});

sub process {
    my ($self) = @_;

}

1;
