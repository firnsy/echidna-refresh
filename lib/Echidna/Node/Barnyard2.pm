#
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

package Echidna::Node::Barnyard2;
use Mojo::Base 'Mojolicious';

#
# PERL INCLUDES
#
use Data::Dumper;
use Digest::SHA qw(sha256_hex);
use Fcntl qw(SEEK_SET);
use File::Basename;
use File::Copy;
use List::Util qw(first);
use Mojo::JSON;
use Mojo::IOLoop;
use Mojo::UserAgent;
use Scalar::Util qw(weaken);

#
# LOCAL INCLUDES
#
use Echidna::Config;

#
# GLOBALS
#


#
# INIT
#

sub config {
  my ($self, $conf) = @_;

  if( ref( $conf ) eq 'Echidna::Config' ) {
    $self->{_config} = $conf->{config};
  }

  return $self->{_config};
}

sub startup_post {
  my $self = shift;
  my $conf = $self->config;

  $self->secret('secret');

  # initialise internal echidna state
  $self->{_echidna} = {};


  #
  # ROUTES
  #

  my $r = $self->routes;

  $r->websocket('/control' => sub {
    my $self = shift;
    my $app = $self->app;

    # connected
    say 'D: connection established ...';

    # Increase inactivity timeout for connection a bit
    Mojo::IOLoop->stream($self->tx->connection)->timeout(300);

    weaken($app);

    # Incoming message
    $self->on(message => sub {
      my ($self, $msg) = @_;

      my $json = Mojo::JSON->new();

      eval {
        $msg = $json->decode($msg);
      };

      if( $@ ) {
        say 'E: unable to decode message: ', Dumper( $msg );
      }

      my $res = {
        type => $msg->{type} //= 'unknown'
      };

      given( $msg->{type} )
      {
        when('auth_request')
        {
          $msg->{nonce} //= '';

          if( $msg->{nonce} eq '' )
          {
            $res->{status} = 500;
          }
          else
          {
            $res->{hmac} = sha256_hex( $msg->{nonce} . $conf->{key} );
            $res->{status} = 200;
          }
        }
        when('auth_validate')
        {
          $app->{_echidna}{session_key} = $msg->{session_key};
          $app->{_echidna}{session_uri} = $msg->{session_uri} . '/api/events';
          $app->{_echidna}{node_id}     = $msg->{node_id};

          $res->{status} = 200;

          say 'D: Session key granted: ' . $app->{_echidna}{session_key} . ' (' . $app->{_echidna}{session_uri} . ')';
          say 'D: Session key ' . $app->{_echidna}{session_key} . ' granted from ' . $app->{_echidna}{session_uri} . ' we are node ' . $app->{_echidna}{node_id};
        }
        when('ping')
        {
          $res->{time} = time(),
          $res->{stt} = $msg->{time} - $res->{time}
        }


        #
        # BARNYARD2 MESSAGES
        when('by2_auth_request')
        {
          $msg->{key} //= '';

          if( ( $msg->{key} eq $conf->{barnyard2}{key} ) &&
              defined($app->{_echidna}{session_key}) )
          {
            $res->{session_key} = $app->{_echidna}{session_key} // '';
            $res->{session_uri} = $app->{_echidna}{session_uri} // '';
            $res->{node_id}     = $app->{_echidna}{node_id};
          }
        }

        #
        # catch all
        default {
          say Dumper($msg);
        }
      }

      $self->send( $json->encode( $res ) );
    });

    # Disconnected
    $self->on(finish => sub {
      my $self = shift;
      $self->app->log->debug('D: connection closed.');
    });

    $self->on(error => sub {
      my $self = shift;
      say( Dumper( $@ ) );
      $self->app->log->debug('ERROR');
    });
  });
}

#
# ROUTES
#


my $conf = Echidna::Config->new({
  host => 'localhost',
  port => 6969,
  key  => 'secret',
});

$conf->parse_command_line(@ARGV);

1;

