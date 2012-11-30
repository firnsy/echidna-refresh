#
#
# This file is part of the Echidna framework
#
# Copyright (C) 2010-2012, Edward Fjellskål <edwardfjellskaal@gmail.com>
#                          Eduardo Urias    <windkaiser@gmail.com>
#                          Ian Firns        <firnsy@securixlive.com>
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License Version 2 as
# published by the Free Software Foundation.  You may not use, modify or
# distribute this program under any other version of the GNU General
# Public License.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.
#

package Echidna::Node::Cxtracker;
use Mojo::Base 'Mojolicious';

#
# PERL INCLUDES
#
use Data::Dumper;
use Digest::SHA qw(sha256_hex);
use Fcntl qw(SEEK_SET);
use File::Basename;
use File::Copy;
use List::Util qw(first);
use Mojo::JSON;
use Mojo::IOLoop;
use Mojo::UserAgent;
use Scalar::Util qw(weaken);

#
# LOCAL INCLUDES
#
use Echidna::Config;

#
# GLOBALS
#
use constant BATCH_RECORD_MAX => 1000;

#
# HELPERS
#

=head2 _get_sessions

 This sub extracts the session data from a session data file.
 Takes $file as input parameter.

=cut

sub _get_session_records {
  my ($spooler, $node_id) = @_;

  my $sessions_data = [];

  if( -e $spooler->{file} ) {
    say('D: Session file found: ' . $spooler->{file});

    if( open(FILE, $spooler->{file}) )
    {
      # fast forward if offset is non-zero
      if( $spooler->{file_offset} > 0 ) {
        say 'D: Offsetting to ' . $spooler->{file_offset} . ' bytes.';
        seek FILE, $spooler->{file_offset}, SEEK_SET;
      }

      # verify the data in the session files
      while( my $line = readline FILE )
      {
        chomp $line;
        $line =~ /^\d{19}/;
        unless($line)
        {
          say('E: Invalid session start format in: ' . $spooler->{file});
          next;
        }

        my @elements = split(/\|/, $line);

        my $file_name_start = '';
        my $file_offset_start = 0;

        my $file_name_end = '';
        my $file_offset_end = 0;

        if( @elements == 16 )
        {
          say('D: No indexing available for session.');
        }
        elsif( @elements == 20 )
        {
          $file_name_start   = $elements[16];
          $file_offset_start = $elements[17];
          $file_name_end     = $elements[18];
          $file_offset_end   = $elements[19];
        }
        else
        {
          say 'E: Unknown cxtracker format detected. Found ' . scalar @elements . ' elements. Invoke cxtracker wiith "-f indexed" or "-f standard" for compliant output.';
          next;
        }

        # build the session structs
        push( @{ $sessions_data }, {
          id                    => sha256_hex(@elements[6..9,1,2]),
          timestamp             => $elements[1],
          time_start            => $elements[1],
          time_end              => $elements[2],
          time_duration         => $elements[3],
          node_id               => $node_id,
          ssn_corr_id           => sha256_hex(@elements[6..9,5]),
          net_version           => $elements[4],
          net_protocol          => $elements[5],
          net_src_ip            => $elements[6],
          net_src_port          => $elements[7],
          net_src_total_packets => $elements[10],
          net_src_total_bytes   => $elements[11],
          net_src_flags         => $elements[14],
          net_dst_ip            => $elements[8],
          net_dst_port          => $elements[9],
          net_dst_total_packets => $elements[12],
          net_dst_total_bytes   => $elements[13],
          net_dst_flags         => $elements[14],
          file_name_start       => $file_name_start,
          file_offset_start     => $file_offset_start,
          file_name_end         => $file_name_end,
          file_offset_end       => $file_offset_end,
          meta_cxt_id           => $elements[0],
        });

        $spooler->{file_offset} = tell FILE;
      }

      close FILE;
    }
  }

  return $sessions_data;
}

sub _cleanup {
  my $self = shift;
  my $conf = $self->config;

  my $file = $self->{_echidna}{spooler}{file};

  if( -e $file ) {
    my $mode = $conf->{cxtracker}{mode} //= 'delete';

    if( $mode eq 'archive' ) {
      my $destination = $conf->{cxtracker}{archive} . '/' . basename( $file );
      say 'D: Archiving ' . $file . ' -> ' . $destination;

      if( -d $conf->{cxtracker}{archive} ) {
        if( ! move( $file, $destination ) ) {
          say 'E: Unable to archive: ' . $file;
        }
      }
      else {
        say 'E: Archive directory does not exist!';
      }
    }
    else {
      say 'D: Deleting ' . $file;

      if( ! unlink($file) ) {
        say 'E: Failed to delete: ' . $file;
      }
    }
  }
  else {
    say 'D: nothing to clean.';
  }
}

sub _get_next_file {
  my ($self, $spooler, $dir, $regex,) = @_;

  # return current file by default
  my $current_file = basename $spooler->{file};

  # check if our current file has grown first


  if( opendir my $dh, $dir ) {
    # collect all available files
    my @files = grep { /$regex/ && -f -r -w "$dir/$_" } readdir($dh);
    closedir($dh);

    # do we have files
    if( @files ) {
      # check for last file in list
      my $index = first { $files[$_] eq $current_file } 0..$#files;

      if( defined($index) ) {
        # no new files when index is last item
        if( $index == $#files ) {
          say 'D: No new files to process';
        }
        else {
          # clean up due to file change
          $self->_cleanup();

          $spooler->{file} = $dir . '/' . $files[$index + 1];
          $spooler->{file_offset} = 0;
        }
      }
      # return first file in list if we didn't find our current
      else {
        # clean up due to file change
        $self->_cleanup();

        $spooler->{file} = $dir . '/' . $files[0];
        $spooler->{file_offset} = 0;
      }

      say 'D: Next file is ' . $spooler->{file} . ', offsetted at ' . $spooler->{file_offset} . ' bytes.';
    }
    else {
      say 'D: No files available.';
    }
  }
  else {
    say 'D: Could not open ' . $dir;
  }
}

sub _flush_records {
  my $self = shift;

  weaken( $self );

  if( @{ $self->{_echidna}{spooler}{records} } ) {
    # grab the record at the head of the list
    my $record_total = scalar @{ $self->{_echidna}{spooler}{records} };
    my $records_submitted = $record_total >= BATCH_RECORD_MAX ? BATCH_RECORD_MAX : $record_total;

    $self->{_echidna}{spooler}{records_submitted} = $records_submitted;

    my $record = [ @{ $self->{_echidna}{spooler}{records} }[0..$records_submitted-1] ];

    say 'D: Posting record to ' . $self->{_echidna}{session_uri} . '/api/sessions (' . @{ $self->{_echidna}{spooler}{records} } . ' in queue)';
    $self->{_echidna}{ua}->post_json($self->{_echidna}{session_uri} . '/api/sessions?session=' . $self->{_echidna}{session_key} => $record => sub {
      my ($ua, $tx) = @_;

      my $tx_res_code = $tx->res->code // -1;

      if( $tx_res_code == 200 ) {
        # pop on success
        splice @{ $self->{_echidna}{spooler}{records} }, 0, $self->{_echidna}{spooler}{records_submitted};
        $self->{_echidna}{spooler}{records_submitted} = 0;
      }
      elsif( $tx_res_code == 502 ) {
        # pop on duplicate (it's already there)
        splice @{ $self->{_echidna}{spooler}{records} }, 0, $self->{_echidna}{spooler}{records_submitted};
        $self->{_echidna}{spooler}{records_submitted} = 0;
      }
      else {
        # indicate failure
        say 'E: Unable to push record. (' . $tx_res_code . ')';
      }

      $self->_flush_records()
    });
  }
  # otherwise continue processing
  else {
    $self->_process();
  }
}

sub _process {
  my $self = shift;
  my $conf = $self->config;

  my $dir = $conf->{cxtracker}{dir};
  my $regex = $conf->{cxtracker}{regex};

  say 'D: Checking dir: ' . $dir;

  # attempt to get more session if none exist
  if( ! @{ $self->{_echidna}{spooler}{records} } ) {
    $self->_get_next_file($self->{_echidna}{spooler}, $dir, $regex);

    # add new sessions to cache
    push @{ $self->{_echidna}{spooler}{records} }, @{ _get_session_records($self->{_echidna}{spooler}, $self->{_echidna}{node_id} ) };
  }

  # check if we have sessions to flush
  if( @{ $self->{_echidna}{spooler}{records} } &&
      $self->{_echidna}{spooler}{records_submitted} == 0 ) {
    $self->_flush_records();
  }
}

sub _process_start {
  my $self = shift;
  my $conf = $self->config;

  if( defined($self->{_echidna}{process_timer}) ) {
    say 'D: Already processing.';
    return;
  }

  # TODO: fanotify based watcher
  say 'D; starting processing ...';

  # establish the poll process
  $self->{_echidna}{process_timer} = Mojo::IOLoop->recurring($conf->{cxtracker}{poll}, sub {
    $self->_process();
  });

  $self->_process();
}

sub _process_stop {
  my $self = shift;

  if( ! defined($self->{_echidna}{process_timer}) )
  {
    say 'D: Not processing.';
    return;
  }

  say 'D: Stopping process loop ...';

  my $id = delete( $self->{_echidna}{process_timer} );
  Mojo::IOLoop->remove( $id );
}


#
# INIT
#

sub config {
  my ($self, $conf) = @_;

  if( ref( $conf ) eq 'Echidna::Config' ) {
    $self->{_config} = $conf->{config};
  }

  return $self->{_config};
}

sub startup_post {
  my $self = shift;
  my $conf = $self->config;

  $self->secret('secret');

  # initialise internal echidna state
  $self->{_echidna} = {
    ua      => Mojo::UserAgent->new(),
    spooler => {
      file              => '',
      file_offset       => -1,
      records           => [],
      records_submitted => 0,
    }
  };


  #
  # ROUTES
  #

  my $r = $self->routes;

  $r->websocket('/control' => sub {
    my $self = shift;
    my $app = $self->app;

    # connected
    say 'D: connection established ...';

    # Increase inactivity timeout for connection a bit
    Mojo::IOLoop->stream($self->tx->connection)->timeout(300);

    weaken($app);

    # Incoming message
    $self->on(message => sub {
      my ($self, $msg) = @_;

      my $json = Mojo::JSON->new();

      eval {
        $msg = $json->decode($msg);
      };

      if( $@ ) {
        say 'E: unable to decode message: ', Dumper( $msg );
      }

      my $res = {
        type => $msg->{type} //= 'unknown'
      };

      given( $msg->{type} )
      {
        when('auth_request')
        {
          $msg->{nonce} //= '';

          if( $msg->{nonce} eq '' )
          {
            $res->{status} = 500;
          }
          else
          {
            $res->{hmac} = sha256_hex( $msg->{nonce} . $conf->{key} );
            $res->{status} = 200;
          }
        }
        when('auth_validate')
        {
          $app->{_echidna}{session_key} = $msg->{session_key};
          $app->{_echidna}{session_uri} = $msg->{session_uri};
          $app->{_echidna}{node_id}     = $msg->{node_id};

          $res->{status} = 200;

          say 'D: Session key granted: ' . $app->{_echidna}{session_key} . ' (' . $app->{_echidna}{session_uri} . ')';
          say 'D: Session key ' . $app->{_echidna}{session_key} . ' granted from ' . $app->{_echidna}{session_uri} . ' we are node ' . $app->{_echidna}{node_id};

          $app->_process_start();
        }
        when('ping')
        {
          $res->{time} = time(),
          $res->{stt} = $msg->{time} - $res->{time}
        }
        default {
          say Dumper($msg);
        }
      }

      $self->send( $json->encode( $res ) );
    });

    # Disconnected
    $self->on(finish => sub {
      my $self = shift;
      $self->app->log->debug('D: connection closed.');
      $self->app->_process_stop();
    });

    $self->on(error => sub {
      my $self = shift;
      say( Dumper( $@ ) );
      $self->app->log->debug('ERROR');
      #_process_stop();
    });
  });
}

#
# ROUTES
#


my $conf = Echidna::Config->new({
  host => 'localhost',
  port => 6969,
  key  => 'secret',
});

$conf->parse_command_line(@ARGV);

1;

