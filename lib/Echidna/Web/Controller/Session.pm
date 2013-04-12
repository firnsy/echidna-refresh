package Echidna::Web::Controller::Session;
use Mojo::Base 'Mojolicious::Controller';

use Data::Dumper;
use Mojo::JSON;

use Echidna::Model::Session;

sub collection_get {
  my $self = shift;
  my $db   = $self->db();

  Mojo::IOLoop->stream($self->tx->connection)->timeout(300);

  my $criteria = $self->filter_criteria('Echidna::Model::Session');

  $db->search(session => $criteria, sub {
    my ($sessions, $error) = @_;

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
        json   => $sessions
      );
    }

  });

  # we'll render via callbacks
  $self->render_later();
}


sub collection_add {
  my $self = shift;
  my $db = $self->db();

  Mojo::IOLoop->stream($self->tx->connection)->timeout(300);

  my $json = Mojo::JSON->new();

  my $data = {};
  my $models =[];

  $data = $json->decode( $self->req()->body() );
  $data = [ $data ] unless ( ref($data) eq 'ARRAY' );

  foreach my $m ( @{ $data } ) {
    push( @{ $models }, Echidna::Model::Session->new( $m ) );
  }

  $db->batch_insert( session => $models, sub {
    my( $rv, $error ) = @_;

    if( defined($error) )
    {
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

  if ( $id ~~ /\d+/ ) {
    $db->search(session => { id => $id }, sub {
      my $session = shift;

      $self->respond_to(
        json => { json => $session },
        any  => { json => $session },
      );
    });
  }
  else {
    $self->render(json => {
      error => 'Invalid Id for Session Resource.'
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
