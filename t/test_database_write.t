#!/usr/bin/perl 

use strict;
use 5.010;

use lib '../lib';
use Data::Dumper;
use Test::More 'no_plan';
use AnyEvent;

use Echidna::Model::Session;
use_ok 'Echidna::Database';

my $settings = {
   type => 'mysql',
   user => 'echidna',
   name => 'echidna',
   pass => 'ech1dna',
   pool_size => 10,
   debug => 1,
};

my $db = Echidna::Database->new( dbi => $settings );

my $session = Echidna::Model::Session->new({
        id                    => '3b9d8298f1b5086d012618feebb2da1a394357c1dab7523443c9f6a743c4c84d',
        node_id               => '3b9d8298f1b5086d012618feebb2da1a394357c1dab7523443c9f6a743c4c84d',
        ssn_corr_id           => '3b9d8298f1b5086d012618feebb2da1a394357c1dab7523443c9f6a743c4c84d',
        time_start            => '2012-12-12 12:12:12',
        time_end              => '2012-12-12 12:12:12',
        net_src_ip            => '2130706433',
        net_src_port          => '220',
        net_dst_ip            => '2130706433',
        net_dst_port          => '22',
        net_protocol          => '6',
        net_src_total_bytes   => '10',
        net_dst_total_bytes   => '10',
        net_src_total_packets => '1',
        net_dst_total_packets => '2',
        timestamp     => '121231212',
        time_duration => '1',
        net_version   => '4',
        net_src_flags => '1',
        net_dst_flags => '1',
        data_filename => 'text',
        data_offset   => '',
        data_length   => '10',
        meta          => '',
});

my $session2 = Echidna::Model::Session->new({
        id                    => '3b9d8298f1b5086d012618feebb2da1a394357c1dab7523443c9f6a743c4c841',
        node_id               => '3b9d8298f1b5086d012618feebb2da1a394357c1dab7523443c9f6a743c4c841',
        ssn_corr_id           => '3b9d8298f1b5086d012618feebb2da1a394357c1dab7523443c9f6a743c4c841',
        time_start            => '2012-12-12 12:12:12',
        time_end              => '2012-12-12 12:12:12',
        net_src_ip            => '2130706433',
        net_src_port          => '220',
        net_dst_ip            => '2130706433',
        net_dst_port          => '22',
        net_protocol          => '6',
        net_src_total_bytes   => '10',
        net_dst_total_bytes   => '10',
        net_src_total_packets => '1',
        net_dst_total_packets => '2',
        timestamp     => '121231212',
        time_duration => '1',
        net_version   => '4',
        net_src_flags => '1',
        net_dst_flags => '1',
        data_filename => 'text',
        data_offset   => '',
        data_length   => '10',
        meta          => '',
});


my $cv = AE::cv;

#$db->insert(session => $session, sub {
#    say "Session Inserted";
#});

$db->batch_insert(session => [$session, $session2], sub {
    $cv->send;
  });


#$db->update(session => { id => '3b9d8298f1b5086d012618feebb2da1a394357c1dab7523443c9f6a743c4c84d' }, { net_dst_flags => 11, asd => "asdfa" }, sub {
#    say "Update Done";
#    $cv->send;
#});

$cv->recv;
