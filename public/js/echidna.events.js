var EventCtrl = function($scope, $filter, $location, Event) {
  console.log("EventController");

  $scope.sortField = 'sig_priority';
  $scope.pageSizes = [
    { name: '10', value: 10 },
    { name: '25', value: 25 },
    { name: '50', value: 50 },
    { name: '100', value: 100 },
  ];

  $scope.fetchItems = function() {
    $scope.items = Event.query({search: 'all'}, 
      // success callback
      function(data) {
        $("#progress-bar").css('display', 'none');

        if ($.isEmptyObject(data)) {
          $scope.items = [
            {"id":"7a4aa674ad44095dfdc2f55c724a4b6391387e060ef41b37e8a139c2419eae73","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"ecdb24aa61bd8cdfe87af9d674884b3ee744ad4e591cb86392c095008d17437b","ssn_corr_id":"5c28696616abaa74ea6644b6b24fec2a12e39daa849c1aa567d1140cb6e5afd9","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":57465,"net_dst_ip":"10.14.2.56","net_dst_port":5500,"net_protocol":6,"timestamp":"2009-08-03 05:22:57","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
            {"id":"7a4aa674ad44095dfdc2f55c724a4b6391387e060ef41b37e8a139c2419eae73","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"ecdb24aa61bd8cdfe87af9d674884b3ee744ad4e591cb86392c095008d17437b","ssn_corr_id":"5c28696616abaa74ea6644b6b24fec2a12e39daa849c1aa567d1140cb6e5afd9","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":57465,"net_dst_ip":"10.14.2.56","net_dst_port":5500,"net_protocol":6,"timestamp":"2009-08-03 05:22:57","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":2,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder 2"},
            {"id":"7a4b048b9c78f59f99e71515985faf25f5ec76e76c957f083551fcd37cad82eb","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"0c551f98429300959baa067fc62ac1c79a150b10c6a0cb960e0874ba1240e994","ssn_corr_id":"3c96dac7e4458433ac7c9a39a5def68810654b5880d8a23fb7c988d8b5cb14b6","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":63994,"net_dst_ip":"10.14.2.56","net_dst_port":4343,"net_protocol":6,"timestamp":"2009-08-02 12:12:45","sig_type":1,"sig_id":17336,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
            {"id":"7a4bbbc0090958c26728271360f6512ebeec1d6e62dfbacfc628f2e935683f28","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"760bbf0f206870f0923531201cd71c2617ab9a1bd419d2c209d4fa55860ca726","ssn_corr_id":"14e46cec29c4cd7b7d80b5bd84a16cc62dd89a89841a84dc0ee1d76254a74332","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":61827,"net_dst_ip":"10.14.2.56","net_dst_port":5500,"net_protocol":6,"timestamp":"2009-08-03 05:07:01","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
            {"id":"7a4c1fed14531d83fa315e24de3b8e7fd90d6740623e6aab26dea357f5fd9803","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"7228ab667073f8d975debfe947bee6f06ff7f235ab5552974c0736c5fc991b53","ssn_corr_id":"65cf212d9bd2fea42d9e541a39b8f577075d63d51f51ee1bd831ca1a6311f264","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":56933,"net_dst_ip":"10.14.2.56","net_dst_port":4343,"net_protocol":6,"timestamp":"2009-08-02 14:20:45","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
            {"id":"7a4c3509eefd7ee4ace4681e201c3d6e7d6c5bcaee0f9c635552c96a65bd11f3","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"d2a1f49a24d68fdc47c5284ed93940ca931bddb838bf830e01303f591ce682c4","ssn_corr_id":"32511003915c72e23fce7e0fa75551c99198b5a649f7a75bebd99da6b281f8c0","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":61879,"net_dst_ip":"10.14.2.56","net_dst_port":4343,"net_protocol":6,"timestamp":"2009-08-02 14:35:28","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
            {"id":"7a4c390ebfac60264df54e8bbfaaad1aa78101b379146284baf4f0159b94f15b","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"a0bc1568f7937c66ba59cef26588be1cd0ba229c14f3f639562c5efce3a14c82","ssn_corr_id":"95117fbe8ab591f9694acdff9ea3d9aaacbe3db34bd5d724e5073b982e6675ac","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":55148,"net_dst_ip":"10.14.2.56","net_dst_port":5500,"net_protocol":6,"timestamp":"2009-08-03 03:57:31","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
            {"id":"7a4c78f5d0a60e1b6e62fd54d66e4b9089599051d130d98cf37427c79e271d09","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"700fbdf0816e234aa60cb3076867ad40b9cafd1c2cd95d07a4821c9a0c96558c","ssn_corr_id":"d08f6855da70d356e8451b031e793ca873e9cb3af76c329755d5a7b074cd35be","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":52469,"net_dst_ip":"10.14.2.56","net_dst_port":4343,"net_protocol":6,"timestamp":"2009-08-02 14:43:59","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"},
            {"id":"7a5ae835ffdaa6c8f4677a06402f94113ecf9b911a4e6bd1319a170610f45833","node_id":"3c2260189e68bdf0deede9a61b6c475072b22e9af3fb589f985250e31bba137b","evt_corr_id":"b1a210411e9942ecc8de69a34cecdce5eaa8d21fe7a0af7ccdfa934ffb54f32b","ssn_corr_id":"2bb3c893997a95a5203c5a2f707860b4734aee74fdef113dd750cd567db9b45c","net_version":4,"net_src_ip":"10.12.3.32","net_src_port":65143,"net_dst_ip":"10.14.2.56","net_dst_port":5500,"net_protocol":6,"timestamp":"2009-08-03 03:29:26","sig_type":1,"sig_id":17335,"sig_revision":2,"sig_category":"0","sig_priority":1,"classification":0,"sig_message":"indicator-shellcode x86 os agnostic fnstenv geteip byte xor decoder"}
          ];
        }

        $scope.search();
        $scope.groupBySigId = _.groupBy($scope.items, 'sig_id');
        $scope.pageSizes.push({ 
          name: 'All', value: $scope.items.length 
        });
      }, 
      // error callback
      function() {
        console.log("ERROR: Couldn't load data");
      });
  };

  $scope.sortReverse = false;
  $scope.filteredItems = [];
  $scope.groupedItems = [];
  $scope.pagedItems = [];
  $scope.currentPage = 0;

  $scope.pageSize = $scope.pageSizes[0];

  var searchMatch = function (haystack, needle) {
    if( !needle ) {
      return true;
    }

    return haystack.toString().toLowerCase().indexOf(needle.toLowerCase()) !== -1;
  };

  // init the filtered items
  $scope.search = function () {
    $scope.filteredItems = $filter('filter')($scope.items, function (item) {
      for(var attr in item) {
        if (searchMatch(item[attr], $scope.query))
          return true;
      }

      return false;
    });

    // take care of the sorting order
    if ($scope.sortField !== '') {
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortField, $scope.reverse);
    }

    $scope.currentPage = 0;

    // now group by pages
    $scope._groupToPages();
  };
     
  // calculate page in place
  $scope._groupToPages = function() {
    $scope.pagedItems = [];
         
    for( var i = 0; i < $scope.filteredItems.length; i++ ) {
      if( i % $scope.pageSize.value === 0 ) {
        $scope.pagedItems[Math.floor(i / $scope.pageSize.value)] = [ $scope.filteredItems[i] ];
      }
      else {
        $scope.pagedItems[Math.floor(i / $scope.pageSize.value)].push($scope.filteredItems[i]);
      }
    }
  };
     
  $scope.range = function(start, end) {
    var ret = [];
    if( !end ) {
      end = start;
      start = 0;
    }
    for (var i = start; i < end; i++) {
      ret.push(i);
    }

    return ret;
  };
     
  $scope.isFirstPage = function() {
    return $scope.currentPage === 0;
  }

  $scope.isLastPage = function() {
    return $scope.currentPage === ($scope.pagedItems.length - 1);
  }

  $scope.firstPage = function () {
    if ($scope.currentPage > 0) {
      $scope.currentPage = 0;
    }
  };

  $scope.prevPage = function () {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
    }
  };
     
  $scope.nextPage = function () {
    if ($scope.currentPage < $scope.pagedItems.length - 1) {
      $scope.currentPage++;
    }
  };

  $scope.lastPage = function () {
    if ($scope.currentPage < $scope.pagedItems.length - 1) {
      $scope.currentPage = ($scope.pagedItems.length - 1);
    }
  };
     
  $scope.setPage = function(n) {
    $scope.currentPage = n;
  };

  $scope.getPageList = function(max) {
    var _m = max || 5;
    var _list = [];

    if( _m >= $scope.pagedItems.length ) {
      for( var i = 0; i < $scope.pagedItems.length; i++ ) {
        _list.push(i);
      }
    }
    else {
      /* calculate lower and upper bounds */
      var _lb = Math.max(0, $scope.currentPage - Math.floor(_m / 2));
      var _ub = Math.min($scope.pagedItems.length, _lb + _m);

      if( (_ub-_lb) <= (_m-1) ) {
        _lb = _ub - _m;
      }

      for( var i = _lb; i < _ub; i++ ) {
        _list.push(i);
      }
    }

    return _list;
  }

  // change sorting order
  $scope.sortBy = function(newSortField) {
    if ( $scope.sortField === newSortField ) {
      $scope.sortReverse ^= true;
    }

    $scope.sortField = newSortField;
  };

  $scope.getSortClass = function(f) {
    if ( $scope.sortField !== f ) return '';

    return $scope.sortReverse ? 'sort-down' : 'sort-up';
  }

  $scope.eventCount = function() {
    return $scope.items.length;
  };

  $scope.formatEventSourceIP = function(e) {
    return e.net_src_ip + ':' + e.net_src_port;
  };

  $scope.formatEventDestinationIP = function(e) {
    return e.net_dst_ip + ':' + e.net_dst_port;
  };

  $scope.formatEventTimestamp = function(e) {
    return e.timestamp;
  };

  $scope.priorityClass = function(priority) {
    return ( priority > 3 ) ? 'badge-priority-default' : 'badge-priority-' + priority;
  };

  $scope.toggleEventDetails = function(e) {
    if( '_showDetails' in e )
      e._showDetails ^= true;
    else
      e._showDetails = true;

    console.log('showing details');
  };

  $scope.showEventDetails = function(e) {
    return ( '_showDetails' in e ) &&
           ( e._showDetails );
  };

  $scope.renderBySignatureId = function(sigId) {
    console.log("Got "+sigId);
    console.log($scope.groupBySigId);

    console.log("Result should be: ");
    console.log($scope.groupBySigId[sigId]);
    $scope.items = $scope.groupBySigId[sigId];
    $scope.search();
  };

  $scope.fetchItems();
};

EventCtrl.$inject = ['$scope', '$filter', '$location', 'Event'];
