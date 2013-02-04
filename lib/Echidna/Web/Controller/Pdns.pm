package Echidna::Web::Controller::Pdns;
use Mojo::Base 'Mojolicious::Controller';

use Data::Dumper;
use Mojo::JSON;

use Echidna::Model::Pdns;

sub collection_get {
  my $self = shift;
  my $db   = $self->db();

  Mojo::IOLoop->stream($self->tx->connection)->timeout(300);

  my $criteria = {};
  for my $attr ( @{ Echidna::Model::Pdns->attributes() } ){
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

  $db->search(pdns => $criteria, sub {
    my ($pdns, $error) = @_;

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
        json   => $pdns
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

  my $data = {};
  my $models = [];

  $data = $json->decode( $self->req()->body() );
  $data = [ $data ] unless ( ref($data) eq 'ARRAY' );

  foreach my $m ( @{ $data } ) {
    push( @{ $models }, Echidna::Model::Pdns->new( $m ) );
  }

  $db->batch_insert( pdns => $models, sub {
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

  if( $id ~~ /\d+/ )
  {
    $db->search(pdns => { id => $id }, sub {
      my $record = shift;

      $self->respond_to(
        json => { json => $record },
        any  => { json => $record },
      );
    });
  }
  else
  {
    $self->render(json => {
      error => 'Invalid Id for PDNS resource.'
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
