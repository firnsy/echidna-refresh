package Echidna::Web::Server;
use Mojo::Base 'Mojolicious';

use Echidna::Database;

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
          debug     => 1,
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

  my $route;

  #
  # build event routes
  $route = $router->under('/api/events');
  $route->get('/')->to('event#collection_get');
  $route->post('/')->to('event#collection_add');
  $route->delete('/')->to('event#collection_delete');

  $route->get('/:id', { id => qr/\d+/ })->to('event#id_get');
  $route->put('/:id', { id => qr/\d+/ })->to('event#id_update');
  $route->delete('/:id', { id => qr/\d+/ })->to('event#id_delete');

  #
  # build session routes
  $route = $router->under('/api/sessions');
  $route->get('/')->to('session#collection_get');
  $route->post('/')->to('session#collection_add');
  $route->delete('/')->to('session#collection_delete');

  $route->get('/:id', { id => qr/\d+/ })->to('session#id_get');
  $route->put('/:id', { id => qr/\d+/ })->to('session#id_update');
  $route->delete('/:id', { id => qr/\d+/ })->to('session#id_delete');

  #
  # build pdns routes
  $route = $router->under('/api/pdns');
  $route->get('/')->to('pdns#collection_get');
  $route->post('/')->to('pdns#collection_add');
  $route->delete('/')->to('pdns#collection_delete');

  $route->get('/:id', { id => qr/\d+/ })->to('pdns#id_get');
  $route->put('/:id', { id => qr/\d+/ })->to('pdns#id_update');
  $route->delete('/:id', { id => qr/\d+/ })->to('pdns#id_delete');


}

1;
