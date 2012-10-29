package Echidna::Web::Controller::Event;
use Mojo::Base 'Mojolicious::Controller';

sub index {
    my $self = shift;
    my $db   = $self->db;

    $self->render_later;
    my $count = $db->count(session => sub {
        my $count = shift;
        $count = shift @$count;

        $self->render(
            json => { total => $count }
        );
    });
}

sub by_id {
    my $self = shift;

    my $db = $self->db;
    my $id = $self->param('id') || '';

    return $self->render(json => {
               error => 'Invalid Id for Event Resource.'
           }) unless $id ~~ /\d+/;

    $db->search(event => { id => $id }, sub {
        my $events = shift;
        $self->render(json => $events);
    });
}

sub add {
    my $self = shift;
    $self->render(
        status => 501,
        json => { status => 'This method has not been implemented yet' }
    );
}

sub update {
    my $self = shift;
    $self->render(
        status => 501,
        json => { status => 'This method has not been implemented yet' }
    );
}

sub delete {
    my $self = shift;
    $self->render(
        status => 501,
        json => { status => 'This method has not been implemented yet' }
    );
}

1;
