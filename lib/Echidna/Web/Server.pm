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

package Echidna::Web::Server;
use Mojo::Base 'Mojolicious';

use Data::Dumper;
use DBD::mysql;
use DBI;
use Digest::SHA qw(sha256_hex);
use List::Util qw(first);
use Mojo::IOLoop;
use Mojo::JSON;
use Mojo::UserAgent;

use Echidna::Database;

#
# CONFIGURATION
#

my $CONF = {
  host => 'localhost',
  port => 6970,
#  key    => 'asdd',

  secret => 'woot',
  agent_status_poll => 10,
  agents => {
    passivedns => {
      type => 'passivedns',
      host => 'localhost',
      port => 6967,
      key  => 'woot',
    },
    barnyard2 => {
      type => 'barnyard2',
      host => 'localhost',
      port => 6968,
      key  => 'woot',
    },
    cxtracker => {
      type => 'cxtracker',
      host => 'localhost',
      port => 6969,
      key  => 'woot',
    },
  }
};

my $AGENTS = {};
my $AGENTS_SC;
my $ACTIVE_SESSION_KEYS = [];

#
# INITIATE AGENT CHECKS
#

sub _agent_status_check {
  foreach my $a ( keys %{ $AGENTS } )
  {
    # TODO: slightly hacky tapping the UA's internal connections
    # property to see if the websocket connection is still active
    if( ( ref($AGENTS->{$a}{_ua}) eq 'Mojo::UserAgent' ) &&
        ( keys %{ $AGENTS->{$a}{_ua}{connections} } ) )
    {
      next;
    }

    my $ws_control = 'ws://' . $AGENTS->{$a}{host} . ':' . $AGENTS->{$a}{port} . '/control';

    say("D: checking agent: $a ($ws_control)");

    $AGENTS->{$a}{_ua}->on(error => sub {
      my ($ua, $err) = @_;
      say "This looks bad: $err";
    });

    $AGENTS->{$a}{_nonce} = sha256_hex( time() );

    $AGENTS->{$a}{_ua}->websocket($ws_control => sub {
      my ($ua, $tx) = @_;

      $tx->on(connection => sub {
        my( $tx, $connection) = @_;
        say Dumper($connection);
      });

      $tx->on(message => sub {
        my ($tx, $msg) = @_;

        my $json = Mojo::JSON->new();

        eval {
          $msg = $json->decode($msg);

          my $res = {
            type => $msg->{type} //= 'unknown'
          };

          given( $msg->{type} )
          {
            when('auth_request')
            {
              if( $msg->{hmac} eq sha256_hex( $AGENTS->{$a}{_nonce} . $AGENTS->{$a}{key} ) )
              {
                # generate session key tracked by agent
                $AGENTS->{$a}{session_key} = sha256_hex( time() );

                # also add to valid session key array
                push @{ $ACTIVE_SESSION_KEYS }, $AGENTS->{$a}{session_key};

                $res->{type} = 'auth_validate',
                $res->{session_key} = $AGENTS->{$a}{session_key};
                $res->{session_uri} = $CONF->{host} . ':' . $CONF->{port};

                say 'I: AUTH granted to ' . $a;
                $tx->send( $json->encode( $res ) );
              }
              else
              {
                say 'E: AUTH denied to ' . $a;
                $tx->finish();
              }
            }
            when('auth_validate')
            {
              if( $msg->{status} eq '200' )
              {
                # establish the heartbeat
                $AGENTS->{$a}{_ping} = Mojo::IOLoop->recurring( 5 => sub {
                  my $json = Mojo::JSON->new();

                  say 'D: ping';

                  $tx->send($json->encode({
                    type => 'ping',
                    time => time()
                  }));
                });
              }
              else
              {
                $tx->finish();
              }
            }
            when('ping')
            {
              say 'D: got pong';
            }
            default {
              say Dumper($msg);
            }
          }
        };
      });

      $tx->on(finish => sub {
        say 'WebSocket closed.';

        # clean up heartbeat as appropriate
        if( defined($AGENTS->{$a}{_ping}) )
        {
          my $_timer_id = delete( $AGENTS->{$a}{_ping} );
          Mojo::IOLoop->remove( $_timer_id );

          # clean up the session key
          my $session_key = delete $AGENTS->{$a}{session_key};
          my $index = first { $ACTIVE_SESSION_KEYS->[$_] eq $session_key } 0..$#$ACTIVE_SESSION_KEYS;
          if( defined($index) ) {
            splice @{ $ACTIVE_SESSION_KEYS }, $index, 1;
          }
        }
      });

      # initialise authentication was we've upgraded to a websocket
      if( $tx->is_websocket ) {
        my $json = Mojo::JSON->new();

        $tx->send($json->encode({
          type  => 'auth_request',
          nonce => $AGENTS->{$a}{_nonce}
        }));
      }
    });
  }
}

sub _agent_setup {
  foreach my $a ( keys %{ $CONF->{agents} } )
  {
    $AGENTS->{$a} = $CONF->{agents}{$a};
    $AGENTS->{$a}{_ua} = Mojo::UserAgent->new();
  }

  say("Starting agent checks ... ");

  $AGENTS_SC = Mojo::IOLoop->recurring( $CONF->{agent_status_poll} => sub { _agent_status_check() } );
}

#
# ROUTES
#



#
# INIT
#

sub startup {
  my $self = shift;

  $self->helper(db => sub {
    Echidna::Database->new(
      dbi => {
          type      => 'mysql',
          user      => 'echidna',
          name      => 'echidna',
          pass      => 'ech1dna',
          pool_size => 10,
          debug     => 0,
      });
  });

  $self->secret('Echidna Echidna Secret Key');

  my $router = $self->routes;

  $router->namespace('Echidna::Web::Controller');
  $router->get('/')->to('main#index')->name('index');

#  my @resources = qw(
#    session
#    event
#    agent
#    node
#  );
#
#  for my $resource (@resources) {
#
#      my $uri = '/api/' .$resource;
#
#      my $route = $router->under($uri);
#
#      $route->get('/')->to($resource .'#index');
#      $route->get('/:id', { id => qr/\d+/ })->to($resource .'#by_id');
#      $route->post('/')->to($resource .'#add');
#      $route->put('/:id', { id => qr/\d+/ })->to($resource .'#update');
#      $route->delete('/:id', { id => qr/\d+/ })->to($resource .'#delete');
#  }

  # establish an authentication route so that anything under /api
  # needs to supply a valid session key to proceed
  my $api_router = $router->bridge('/api')->to(cb => sub {
      my $self = shift;

      my $session_key = $self->param('session');

      if( defined($session_key) && ( $session_key ~~ $ACTIVE_SESSION_KEYS ) ) {
        return 1;
      }

      # say Dumper($session_key, $ACTIVE_SESSION_KEYS);

      $self->render(
        status => 403,
        json => { status => 'Invalid session key.' }
      );

      return undef;
  });

  my $route;

  #
  # build node routes /api/nodes
  $route = $api_router->under('/nodes');
  $route->get('/')->to('node#collection_get');
  $route->post('/')->to('node#collection_add');
  $route->delete('/')->to('node#collection_delete');

  $route->get('/:id', { id => qr/\d+/ })->to('node#id_get');
  $route->put('/:id', { id => qr/\d+/ })->to('node#id_update');
  $route->delete('/:id', { id => qr/\d+/ })->to('node#id_delete');

  #
  # build event routes /api/events
  $route = $api_router->under('/events');
  $route->get('/')->to('event#collection_get');
  $route->post('/')->to('event#collection_add');
  $route->delete('/')->to('event#collection_delete');

  $route->get('/:id', { id => qr/\d+/ })->to('event#id_get');
  $route->put('/:id', { id => qr/\d+/ })->to('event#id_update');
  $route->delete('/:id', { id => qr/\d+/ })->to('event#id_delete');

  #
  # build session routes /api/sessions
  $route = $api_router->under('/sessions');
  $route->get('/')->to('session#collection_get');
  $route->post('/')->to('session#collection_add');
  $route->delete('/')->to('session#collection_delete');

  $route->get('/:id', { id => qr/\d+/ })->to('session#id_get');
  $route->put('/:id', { id => qr/\d+/ })->to('session#id_update');
  $route->delete('/:id', { id => qr/\d+/ })->to('session#id_delete');

  #
  # build pdns routes /api/pdns
  $route = $api_router->under('/pdns');
  $route->get('/')->to('pdns#collection_get');
  $route->post('/')->to('pdns#collection_add');
  $route->delete('/')->to('pdns#collection_delete');

  $route->get('/:id', { id => qr/\d+/ })->to('pdns#id_get');
  $route->put('/:id', { id => qr/\d+/ })->to('pdns#id_update');
  $route->delete('/:id', { id => qr/\d+/ })->to('pdns#id_delete');

  _agent_setup();
}

1;
