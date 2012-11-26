#
# This file is part of the Echidna framework
#
# Copyright (C) 2010-2012, Edward Fjellskål <edwardfjellskaal@gmail.com>
#                          Eduardo Urias    <windkaiser@gmail.com>
#                          Ian Firns        <firnsy@securixlive.com>
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License Version 2 as
# published by the Free Software Foundation.  You may not use, modify or
# distribute this program under any other version of the GNU General
# Public License.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.
#
package Echidna::Config;

use warnings;
use strict;
use v5.10;

#
# PERL INCLUDES
#
use Carp;
use Data::Dumper;
use Getopt::Long;
use Storable qw(dclone);
use YAML::Tiny;

#
# GLOBALS
#
my $instance;

sub new {
  my ($class, $defaults) = @_;

  $defaults //= {};
  $defaults->{host} //= 'localhost';
  $defaults->{port} //= 8080;

  my $self = bless {
    config        => $defaults,
    _command_line => [],
    _config_path  => '',
  }, __PACKAGE__;

  return $self;
}

sub parse_command_line {
  my ($self, @arguments) = @_;

  $self->{_command_line} = [ dclone( \@arguments ) ];

  # parse the command line ( highest priority )
  my $args = {
    host    => $self->{config}{host},
    port    => $self->{config}{port},
    config  => $self->{_config_path},
  };
  my $ret = GetOptions($args, 'host|h=s', 'port|p=s', 'config|c=s');

  # check for any configuration file parameter
  if( -r $args->{config} ) {
    $self->{_config_path} = $args->{config};

    say 'D: reading config file.';
    $ret &= $self->parse_config_file( $self->{_config_path} );
  }

  return $ret;
}

sub parse_config_file {
  my ($self, $file) = @_;

  $file //= $self->{_config_path};

  my $yaml = YAML::Tiny->read($file);

  croak 'Could not parse configuration file.' if ( ! defined($yaml) );

  # determine number of pages
  my $pages = @{ $yaml };

  croak 'No configuration page(s) available.' if ( $pages == 0 );

  carp('Multiple configuration pages found. Using the first') if ( $pages > 1 );

  # only use the first page
  $self->{config}  = $self->_merge( $self->{config}, $yaml->[0] );
};

#
# ATTRIBUTES
#

sub listen {
  my $self = shift;

  return 'http://' . $self->{config}{host} . ':' . $self->{config}{port};
}


#
# PRIVATE
#

sub _merge (@) {
  my ($self, $left, @right) = @_;

  return $left unless @right;

  return $self->_merge($left, $self->_merge(@right)) if @right > 1;

  my ($right) = @right;

  my %merge = %$left;

  for my $key (keys %$right) {
    my ($hr, $hl) = map { ref $_->{$key} eq 'HASH' } $right, $left;

    if( $hr and $hl ) {
      $merge{$key} = $self->_merge($left->{$key}, $right->{$key});
    }
    else {
    $merge{$key} = $right->{$key};
    }
  }

  return \%merge;
}
1;
