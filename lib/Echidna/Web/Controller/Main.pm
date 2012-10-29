package Echidna::Web::Controller::Main;
use Mojo::Base 'Mojolicious::Controller';

sub index {
    my $self = shift;

    my $db = $self->db->fetch;

    $db->exec("SELECT SLEEP(10)", sub {
    $self->respond_to(
        json => {json => {hello => 'world'}},
        xml  => {text => '<hello>world</hello>'},
        html => sub {
            $self->render(text => 'Hello');
        }
    );
    });
}

sub by_id {
    my $self = shift;

    my $id = $self->param('id') || '';
    $self->redirect_to('/') unless $id ~~ /\d+/;

    $self->render(json => { id => $id, type => 'main' });
}

1;
