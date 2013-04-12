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

#
# PERL INCLUDES
#
use Data::Dumper;
use DBD::mysql;
use DBI;
use Digest::SHA qw(sha256_hex);
use List::Util qw(first);
use Mojo::IOLoop;
use Mojo::JSON;
use Mojo::UserAgent;
use Mojolicious::Plugin::Authentication;
use Scalar::Util qw(weaken);

#
# LOCAL INCLUDES
#
use Echidna::Database;

#
# CONFIGURATION
#

my $NODES = {};
my $NODES_SC;
my $ACTIVE_SESSION_KEYS = [];

#
# INITIATE AGENT CHECKS
#

sub _node_status_check {
  my $self = shift;
  my $conf = $self->config;

  foreach my $n ( keys %{ $NODES } )
  {
    my $node = $NODES->{$n};

    # TODO: slightly hacky tapping the UA's internal connections
    # property to see if the websocket connection is still active
    if( ( ref($node->{_ua}) eq 'Mojo::UserAgent' ) &&
        ( keys %{ $node->{_ua}{connections} } ) )
    {
      next;
    }

    my $ws_control = 'ws://' . $node->{host} . ':' . $node->{port} . '/control';

    say 'D: checking ' . $node->{type} . ' node: ' . $n . ' (' . $ws_control . ')';

    $node->{_ua}->on(error => sub {
      my ($ua, $err) = @_;
      say "This looks bad: $err";
    });

    $node->{_nonce} = sha256_hex( time() );

    $node->{_ua}->websocket($ws_control => sub {
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
              if( $msg->{hmac} eq sha256_hex( $node->{_nonce} . $node->{key} ) )
              {
                # generate session key tracked by agent
                $node->{session_key} = sha256_hex( time() );

                # also add to valid session key array
                push @{ $ACTIVE_SESSION_KEYS }, $node->{session_key};

                $res->{type} = 'auth_validate',
                $res->{session_key} = $node->{session_key};
                $res->{session_uri} = $conf->{host} . ':' . $conf->{port};
                $res->{node_id} = $n;

                say 'I: AUTH granted to ' . $n;
                $tx->send( $json->encode( $res ) );
              }
              else
              {
                say 'E: AUTH denied to ' . $n;
                $tx->finish();
              }
            }
            when('auth_validate')
            {
              if( $msg->{status} eq '200' )
              {
                # establish the heartbeat
                $node->{_ping} = Mojo::IOLoop->recurring( 5 => sub {
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
        if( defined($node->{_ping}) )
        {
          my $_timer_id = delete( $node->{_ping} );
          Mojo::IOLoop->remove( $_timer_id );

          # clean up the session key
          my $session_key = delete $node->{session_key};
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
          nonce => $node->{_nonce}
        }));
      }
    });
  }
}

sub _node_setup {
  my $self = shift;
  my $conf = $self->config;

  foreach my $a ( keys %{ $conf->{nodes} } )
  {
    $NODES->{$a} = $conf->{nodes}{$a};
    $NODES->{$a}{_ua} = Mojo::UserAgent->new();
  }

  say 'Starting agent checks (refresh every ' . $conf->{node_status_poll} . ' seconds)... ';

  $self->_node_status_check();

  weaken( $self );
  $NODES_SC = Mojo::IOLoop->recurring( $conf->{node_status_poll} => sub { $self->_node_status_check() } );
}

#
# ROUTES
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

  $self->helper(db => sub {
    Echidna::Database->new(
      dbi => $conf->{database}
    );
  });

  $self->helper(filter_criteria => sub {
    my ($self, $model) = @_;
    my $criteria = {};

    for my $attr ( @{ $model->attributes() } ){
      if (defined $self->param($attr)) {
        $criteria->{$attr} = $self->param($attr);
      }
    }


    for my $attr ('limit', 'offset') {
      if (defined $self->param($attr)) {
        $criteria->{$attr} = $self->param($attr);
      }
    }

    if (defined $self->param('fields')) {
      my @fields = split ',', $self->param('fields');
      $criteria->{fields} = \@fields;
    }

    my ($from_attr, $to_attr) = @{ $model->range_attrs() };

    $to_attr = $from_attr unless defined $to_attr;

    # from=[START DATE]&to=[END DATE]
    if (defined $self->param('from')) {
      $criteria->{$from_attr} = {
        '$gte' => $self->param('from')
      };

      if (defined $self->param('to')) {
        $criteria->{$to_attr} = {
          '$lte' => $self->param('to')
        };
      }
    }

    return $criteria;
  });

  $self->plugin('authentication' => {
    autoload_user => 1,
    session_key   => 'echidna',
    load_user     => sub {
      my( $app, $uid ) = @_;
      say 'D: load user';
      return {};
    },
    validate_user => sub {
      my( $app, $username, $password, $extra_data) = @_;
      say 'D: validate ' . $username . ':' . $password;

      my $query = "SELECT * FROM user WHERE username = ? AND password = ?";
      say "SQL: ", $query;
      my $user_found = $self->db->execute($query, [$username, $password])->recv;

      say "User Found?: ";
      say Dumper $user_found;


      if (defined $user_found and ref $user_found eq 'ARRAY') {
        return 1 if scalar @$user_found > 0;
      } else {
        say 'Error - Bogus response from authentication in the database';
      }

      return 0;
    }
  });

  # tune default expiration to 1 day
  $self->sessions->default_expiration(86400);

  $self->secret('Echidna Echidna Secret Key');

  my $router = $self->routes;

  $router->namespaces(['Echidna::Web::Controller']);

  $router->get('/login')->to('main#login');
  $router->post('/login')->to('main#login_auth');

  $router->get('/logout')->to('main#logout');

  $router->get('/')->to('main#index');

  my $auth_router = $router->route('/')->to(cb => sub {
    my $self = shift;

    if( $self->is_user_authenticated ) {
      return 1;
    }

    # not authenticated so redirect to login
    $self->redirect_to('/login');
    return 0;
  });

  # establish an authentication route so that anything under /api
  # needs to supply a valid session key to proceed
  my $api_router = $router->bridge('/api')->to(cb => sub {
      my $self = shift;

      my $session_key = $self->param('session');

      if( defined($session_key) && ( $session_key ~~ $ACTIVE_SESSION_KEYS ) ) {
        return 1;
      }

      #say Dumper($session_key, $ACTIVE_SESSION_KEYS);

      $self->render(
        status => 403,
        json => { status => 'Invalid session key.' }
      );

      return undef;
  });

  $api_router = $auth_router->route('/api')->over(authenticated => 1);
  my $route;

  $route = $api_router->under('/users');
  $route->get('/')->to('main#users_get');

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

  $self->_node_setup();
}

1;
