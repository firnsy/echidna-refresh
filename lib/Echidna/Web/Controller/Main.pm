package Echidna::Web::Controller::Main;
use Mojo::Base 'Mojolicious::Controller';
use Data::Dumper;
use Echidna::Model::User;

sub login {
  my $self = shift;

  # deauthenticate just in case
  $self->deauthenticate();

  $self->render('login');
}

sub logout {
  my $self = shift;

  $self->deauthenticate();

  $self->redirect_to('/login');
}

sub login_auth {
  my $self = shift;

  my $username = $self->param('username') // '';
  my $password = $self->param('password') // '';

  $self->authenticate( $username, $password );

  if( $self->is_user_authenticated ) {

    # get node_id and save to session


    say 'All Good';
    return $self->redirect_to('/');
  }

  $self->stash( error => 'You SUCK!!!' );

  $self->redirect_to('/login');
}

sub index {
  my $self = shift;

  if( $self->is_user_authenticated ) {
    return $self->render('/index');
  }

  $self->stash( error => 'You SUCK!!!' );

  $self->redirect_to('/login');
}

sub users_get {
  my $self = shift;

  $self->db->search(user => {}, sub {
      my ($users, $err) = @_;

      if (defined $err) { say $err }

      $self->render(
        status => 200,
        json   => $users
      );
    });

}

1;
