package Echidna::Model::Agent;

use strict;
use 5.010;

use base qw(Echidna::Model::Object);

__PACKAGE__->set_properties({
    id            => ['int'],
    name          => ['text'],
    password      => ['text'],
    state         => ['text'],
    updated       => ['text'],
    ip            => ['decimal'],
    description   => 'text',
});

1;
