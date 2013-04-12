package Echidna::Model::User;

use strict;
use 5.010;

use base qw(Echidna::Model::Object);

__PACKAGE__->set_properties({
    id        => ['int'],
    username  => ['text'],
    password  => ['text'],
});

sub order_attr { 'id' }

1;

