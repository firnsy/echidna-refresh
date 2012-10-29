package Echidna::Model;

use strict;
use 5.010;
use Carp;
use Module::Pluggable
    search_path => 'Echidna::Model',
    sub_name    => 'objects',
    except      => qr/Base/;

1;
