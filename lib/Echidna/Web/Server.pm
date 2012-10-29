package Echidna::Web::Server;
use Mojo::Base 'Mojolicious';

use Echidna::Service::Database;

sub startup {
  my $self = shift;

  $self->helper(db => sub {
    Echidna::Service::Database->new(
      dbi => {
          driver    => 'mysql',
          user      => 'echidna',
          database  => 'echidna',
          password  => 'ech1dna',
          pool_size => 2,
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
  # build session routes
  $route = $router->under('/api/sessions');
  $route->get('/')->to('session#collection_get');
  $route->post('/')->to('session#collection_add');
  $route->delete('/')->to('session#collection_delete');

  $route = $router->under('/api/session');
  $route->get('/:id', { id => qr/\d+/ })->to('session#id_get');
  $route->put('/:id', { id => qr/\d+/ })->to('session#id_update');
  $route->delete('/:id', { id => qr/\d+/ })->to('session#id_delete');


}

1;
