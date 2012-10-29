package Echidna::Model::Node;

use strict;
use 5.010;

use base qw(Echidna::Model::Object);

__PACKAGE__->set_properties({
    id          => ['int'],
    name        => ['text'],
    type        => ['text'],
    agent_id    => ['int'],
    password    => ['text'],
    network     => ['text'],
    state       => ['text'],
    updated     => ['text'],
    description => 'text',
});

1;
