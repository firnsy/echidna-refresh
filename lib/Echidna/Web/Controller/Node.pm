package Echidna::Web::Controller::Node;
use Mojo::Base 'Mojolicious::Controller';

use Data::Dumper;
use Echidna::Model::Node;

sub collection_get {
  my $self = shift;
  my $db   = $self->db();

  Mojo::IOLoop->stream($self->tx->connection)->timeout(300);

  my $criteria = {};
  for my $attr ( @{ Echidna::Model::Node->attributes() } )
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
      Echidna::Model::Node->validate($criteria);
    };
    if( $@ )
    {
      say "Something Failed..";
      $self->render_json({ error => $@ });
      return;
    }

    my $s_time = time;
    $db->search(node => $criteria, sub {
      my $nodes = shift;

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
    $db->count(node => sub {
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
    $model = Echidna::Model::Node->new( $data );

    $db->insert( node => $model, sub {
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
        say Dumper( $rv );

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
      json => { status => 'Error inserting NODE data.' }
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
    $db->search(node => { id => $id }, sub {
      my $node = shift;

      $self->respond_to(
        json => { json => $event },
        any  => { json => $event },
      );
    });
  }
  else
  {
    $self->render(json => {
      error => 'Invalid ID for NODE resource.'
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
