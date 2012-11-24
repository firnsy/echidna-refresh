package Echidna::Web::Controller::Event;
use Mojo::Base 'Mojolicious::Controller';

use Data::Dumper;
use Echidna::Model::Event;

sub collection_get {
  my $self = shift;
  my $db   = $self->db();

  Mojo::IOLoop->stream($self->tx->connection)->timeout(300);

  my $criteria = {};
  for my $attr ( @{ Echidna::Model::Event->attributes() } )
  {
    if( defined($self->param($attr)) )
    {
      $criteria->{$attr} = $self->param($attr);
    }
  }

  say Dumper $criteria;

  if( keys( %$criteria ) > 0 )
  {
    eval {
      Echidna::Model::Event->validate($criteria);
    };
    if( $@ )
    {
      say "Something Failed..";
      $self->render_json({ error => $@ });
      return;
    }

    my $s_time = time;
    $db->search(event => $criteria, sub {
      my $events = shift;

      my $e_time = time;
      my $diff = $e_time - $s_time;
      say "Took: " .$diff;

      #$self->respond_to(
      #    json => { json => { "total" => $diff } },
      #    any  => { json => $events },
      #);
      $self->render_json({took=>$diff});
    });
  }
  else
  {
    $db->count(event => sub {
      my $count = shift;

      $self->respond_to(
        json => { json => { total => $count } },
        xml  => { text => "<total>" . $count->[0] . "</total>" }
      );
    });
  }

  # we'll render via callbacks
  $self->render_later();
}

sub collection_add {
  my $self = shift;
  my $db = $self->db();

  my $json = Mojo::JSON->new();

  my $data = {};
  my $model;

  eval {
    $data = $json->decode( $self->req()->body() );
    $model = Echidna::Model::Event->new( $data );

    $db->insert( event => $model, sub {
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
  };
  if( $@ )
  {
    $self->render(
      status => 500,
      json => { status => 'Error inserting data.' }
    );
  }

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
