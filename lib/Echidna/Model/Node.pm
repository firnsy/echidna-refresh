package Echidna::Model::Node;

use strict;
use 5.010;

use base qw(Echidna::Model::Object);

__PACKAGE__->set_properties({
    # required

    # sha256(concat(type,host,port))
    id                => ['sha256'],

    type              => ['text'],
    host              => ['ip'],
    port              => ['int'],
    key               => ['text'],

    name              => ['text'],
    network           => ['text'],

    status_state      => ['int'],
    status_timestamp  => ['timestamp'],

    # json structure of node specific configuration
    conf              => ['text'],

    # json array of other node id's
    children          => ['text'],

    # optional
    description       => 'text',
});

1;
