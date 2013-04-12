package Echidna::Web::Controller::Event;
use Mojo::Base 'Mojolicious::Controller';

use Data::Dumper;
use Mojo::JSON;

use Echidna::Model::Event;

sub collection_get {
  my $self = shift;
  my $db   = $self->db();

  Mojo::IOLoop->stream($self->tx->connection)->timeout(300);

  my $criteria = $self->filter_criteria('Echidna::Model::Event');

  $db->search(event => $criteria, sub {
    my ($events, $error) = @_;

    if (defined($error)) {
      $self->render(
        status => 502,
        json => []
      );
    }
    else
    {
      $self->render(
        status => 200,
        json   => $events
      );
    }

  });

  # we'll render via callbacks
  $self->render_later();
}

sub collection_add {
  my $self = shift;
  my $db = $self->db();

  my $json = Mojo::JSON->new();

  my $data = $json->decode( $self->req()->body() );
  my $model = Echidna::Model::Event->new( $data );

  $db->insert( event => $model, sub {
    my( $rv, $error ) = @_;

    if( defined($error) )
    {
      say 'E: ' . $error;

      $self->render(
        status => 502,
        json => { status => 'Error.' }
      );
    }
    else
    {
      $self->render(
        status => 200,
        json => { status => 'Success.' }
      );
    }
  });

  # we'll render via callbacks
  $self->render_later();
}

sub collection_delete {
  my $self = shift;

  my $db = $self->db();
}

sub id_get {
  my $self = shift;

  my $db = $self->app->db();
  my $id = $self->param('id') || '';

  if( $id ~~ /\d+/ )
  {
    $db->search(event => { id => $id }, sub {
      my $event = shift;

      $self->respond_to(
        json => { json => $event },
        any  => { json => $event },
      );
    });
  }
  else
  {
    $self->render(json => {
      error => 'Invalid Id for Event Resource.'
    });
  }

  # we'll render via callbacks
  $self->render_later();
}

sub id_add {
  my $self = shift;

  $self->render(
    status => 501,
    json => { status => 'This method has not been implemented yet' }
  );
}

sub id_delete {
  my $self = shift;

  $self->render(
    status => 501,
    json => { status => 'This method has not been implemented yet' }
  );
}

1;
