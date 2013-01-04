function SessionsCtrl( $scope, $filter, $http, echidnaService, Session) {

  //
  // INIT

  $scope.items = [];
  $http.get('/api/sessions').success(function(data) {
    $scope.items = data;
    $scope.search();
  });

  console.log("Scope Items: ");
  console.log($scope.items);
  //$scope.items = [];
  // $scope.items = [
    // {"id": "4c8fd7f359127b4b9e5de64a5e42c15659317e799689d1f1f89c9bdd10b0d0b9", "node_id": "4e01c629dded78450d09f6e6da5660678d6918ca6c4a6e5316d6367f2d2a5023", "ssn_corr_id": "f8adb368ae49bcaaea366e67fdae14e925282b59d1d426f6556f04164ff10b02", "time_start": "2012-12-03 05:14:37", "time_end": "2012-12-03 05:14:37", "net_version": 2, "net_src_ip": "173.255.243.154", "net_src_port": 40470, "net_src_total_packets": 2, "net_src_total_bytes": 145, "net_dst_ip": "173.203.99.19", "net_dst_port": 6667, "net_dst_total_packets": 2, "net_dst_total_bytes": 24, "net_protocol": 6, "timestamp": "2012-12-03 05:14:37", "time_duration": 0, "net_src_flags": 161, "net_dst_flags": 24, "file_name_start": "pcap.1354511673", "file_offset_start": 7460, "file_name_end": "pcap.1354511673", "file_offset_end": 8580, "meta": "", "meta_cxt_id": 1354511677000000004},
    // {"id": "4c8fd7f359127b4b9e5de64a5e42c15659317e799689d1f1f89c9bdd10b0d0b8", "node_id": "4e01c629dded78450d09f6e6da5660678d6918ca6c4a6e5316d6367f2d2a5023", "ssn_corr_id": "f8adb368ae49bcaaea366e67fdae14e925282b59d1d426f6556f04164ff10b02", "time_start": "2012-12-02 05:14:37", "time_end": "2012-12-03 05:14:37", "net_version": 2, "net_src_ip": "173.255.243.154", "net_src_port": 40470, "net_src_total_packets": 2, "net_src_total_bytes": 145, "net_dst_ip": "173.203.99.19", "net_dst_port": 6667, "net_dst_total_packets": 2, "net_dst_total_bytes": 24, "net_protocol": 6, "timestamp": "2012-12-03 05:14:37", "time_duration": 0, "net_src_flags": 161, "net_dst_flags": 24, "file_name_start": "pcap.1354511673", "file_offset_start": 7460, "file_name_end": "pcap.1354511673", "file_offset_end": 8580, "meta": "", "meta_cxt_id": 1354511677000000004},
    // {"id": "4c8fd7f359127b4b9e5de64a5e42c15659317e799689d1f1f89c9bdd10b0d0b7", "node_id": "4e01c629dded78450d09f6e6da5660678d6918ca6c4a6e5316d6367f2d2a5023", "ssn_corr_id": "f8adb368ae49bcaaea366e67fdae14e925282b59d1d426f6556f04164ff10b02", "time_start": "2012-12-01 05:14:37", "time_end": "2012-12-03 05:14:37", "net_version": 2, "net_src_ip": "173.255.243.154", "net_src_port": 40470, "net_src_total_packets": 2, "net_src_total_bytes": 145, "net_dst_ip": "173.203.99.19", "net_dst_port": 6667, "net_dst_total_packets": 2, "net_dst_total_bytes": 24, "net_protocol": 6, "timestamp": "2012-12-03 05:14:37", "time_duration": 0, "net_src_flags": 161, "net_dst_flags": 24, "file_name_start": "pcap.1354511673", "file_offset_start": 7460, "file_name_end": "pcap.1354511673", "file_offset_end": 8580, "meta": "", "meta_cxt_id": 1354511677000000004},
    // {"id": "4c8fd7f359127b4b9e5de64a5e42c15659317e799689d1f1f89c9bdd10b0d0b6", "node_id": "4e01c629dded78450d09f6e6da5660678d6918ca6c4a6e5316d6367f2d2a5023", "ssn_corr_id": "f8adb368ae49bcaaea366e67fdae14e925282b59d1d426f6556f04164ff10b02", "time_start": "2012-11-03 05:14:37", "time_end": "2012-12-03 05:14:37", "net_version": 2, "net_src_ip": "173.255.243.154", "net_src_port": 40470, "net_src_total_packets": 2, "net_src_total_bytes": 145, "net_dst_ip": "173.203.99.19", "net_dst_port": 6667, "net_dst_total_packets": 2, "net_dst_total_bytes": 24, "net_protocol": 6, "timestamp": "2012-12-03 05:14:37", "time_duration": 0, "net_src_flags": 161, "net_dst_flags": 24, "file_name_start": "pcap.1354511673", "file_offset_start": 7460, "file_name_end": "pcap.1354511673", "file_offset_end": 8580, "meta": "", "meta_cxt_id": 1354511677000000004},
    // {"id": "4c8fd7f359127b4b9e5de64a5e42c15659317e799689d1f1f89c9bdd10b0d0b5", "node_id": "4e01c629dded78450d09f6e6da5660678d6918ca6c4a6e5316d6367f2d2a5023", "ssn_corr_id": "f8adb368ae49bcaaea366e67fdae14e925282b59d1d426f6556f04164ff10b02", "time_start": "2012-11-02 05:14:37", "time_end": "2012-12-03 05:14:37", "net_version": 2, "net_src_ip": "173.255.243.154", "net_src_port": 40470, "net_src_total_packets": 2, "net_src_total_bytes": 145, "net_dst_ip": "173.203.99.19", "net_dst_port": 6667, "net_dst_total_packets": 2, "net_dst_total_bytes": 24, "net_protocol": 6, "timestamp": "2012-12-03 05:14:37", "time_duration": 0, "net_src_flags": 161, "net_dst_flags": 24, "file_name_start": "pcap.1354511673", "file_offset_start": 7460, "file_name_end": "pcap.1354511673", "file_offset_end": 8580, "meta": "", "meta_cxt_id": 1354511677000000004},
    // {"id": "4c8fd7f359127b4b9e5de64a5e42c15659317e799689d1f1f89c9bdd10b0d0b4", "node_id": "4e01c629dded78450d09f6e6da5660678d6918ca6c4a6e5316d6367f2d2a5023", "ssn_corr_id": "f8adb368ae49bcaaea366e67fdae14e925282b59d1d426f6556f04164ff10b02", "time_start": "2012-11-01 05:14:37", "time_end": "2012-12-03 05:14:37", "net_version": 2, "net_src_ip": "173.255.243.154", "net_src_port": 40470, "net_src_total_packets": 2, "net_src_total_bytes": 145, "net_dst_ip": "173.203.99.19", "net_dst_port": 6667, "net_dst_total_packets": 2, "net_dst_total_bytes": 24, "net_protocol": 6, "timestamp": "2012-12-03 05:14:37", "time_duration": 0, "net_src_flags": 161, "net_dst_flags": 24, "file_name_start": "pcap.1354511673", "file_offset_start": 7460, "file_name_end": "pcap.1354511673", "file_offset_end": 8580, "meta": "", "meta_cxt_id": 1354511677000000004},
    // {"id": "4c8fd7f359127b4b9e5de64a5e42c15659317e799689d1f1f89c9bdd10b0d0b3", "node_id": "4e01c629dded78450d09f6e6da5660678d6918ca6c4a6e5316d6367f2d2a5023", "ssn_corr_id": "f8adb368ae49bcaaea366e67fdae14e925282b59d1d426f6556f04164ff10b02", "time_start": "2012-10-03 05:14:37", "time_end": "2012-12-03 05:14:37", "net_version": 2, "net_src_ip": "173.255.243.154", "net_src_port": 40470, "net_src_total_packets": 2, "net_src_total_bytes": 145, "net_dst_ip": "173.203.99.19", "net_dst_port": 6667, "net_dst_total_packets": 2, "net_dst_total_bytes": 24, "net_protocol": 6, "timestamp": "2012-12-03 05:14:37", "time_duration": 0, "net_src_flags": 161, "net_dst_flags": 24, "file_name_start": "pcap.1354511673", "file_offset_start": 7460, "file_name_end": "pcap.1354511673", "file_offset_end": 8580, "meta": "", "meta_cxt_id": 1354511677000000004},
    // {"id": "4c8fd7f359127b4b9e5de64a5e42c15659317e799689d1f1f89c9bdd10b0d0b2", "node_id": "4e01c629dded78450d09f6e6da5660678d6918ca6c4a6e5316d6367f2d2a5023", "ssn_corr_id": "f8adb368ae49bcaaea366e67fdae14e925282b59d1d426f6556f04164ff10b02", "time_start": "2012-10-03 05:14:37", "time_end": "2012-12-03 05:14:37", "net_version": 2, "net_src_ip": "173.255.243.154", "net_src_port": 40470, "net_src_total_packets": 2, "net_src_total_bytes": 145, "net_dst_ip": "173.203.99.19", "net_dst_port": 6667, "net_dst_total_packets": 2, "net_dst_total_bytes": 24, "net_protocol": 6, "timestamp": "2012-12-03 05:14:37", "time_duration": 0, "net_src_flags": 161, "net_dst_flags": 24, "file_name_start": "pcap.1354511673", "file_offset_start": 7460, "file_name_end": "pcap.1354511673", "file_offset_end": 8580, "meta": "", "meta_cxt_id": 1354511677000000004},
    // {"id": "4c8fd7f359127b4b9e5de64a5e42c15659317e799689d1f1f89c9bdd10b0d0b1", "node_id": "4e01c629dded78450d09f6e6da5660678d6918ca6c4a6e5316d6367f2d2a5023", "ssn_corr_id": "f8adb368ae49bcaaea366e67fdae14e925282b59d1d426f6556f04164ff10b02", "time_start": "2012-09-03 05:14:37", "time_end": "2012-12-03 05:14:37", "net_version": 2, "net_src_ip": "173.255.243.154", "net_src_port": 40470, "net_src_total_packets": 2, "net_src_total_bytes": 145, "net_dst_ip": "173.203.99.19", "net_dst_port": 6667, "net_dst_total_packets": 2, "net_dst_total_bytes": 24, "net_protocol": 6, "timestamp": "2012-12-03 05:14:37", "time_duration": 0, "net_src_flags": 161, "net_dst_flags": 24, "file_name_start": "pcap.1354511673", "file_offset_start": 7460, "file_name_end": "pcap.1354511673", "file_offset_end": 8580, "meta": "", "meta_cxt_id": 1354511677000000004},
    // {"id": "4c8fd7f359127b4b9e5de64a5e42c15659317e799689d1f1f89c9bdd10b0d0b0", "node_id": "4e01c629dded78450d09f6e6da5660678d6918ca6c4a6e5316d6367f2d2a5023", "ssn_corr_id": "f8adb368ae49bcaaea366e67fdae14e925282b59d1d426f6556f04164ff10b02", "time_start": "2012-08-03 05:14:37", "time_end": "2012-12-03 05:14:37", "net_version": 2, "net_src_ip": "173.255.243.154", "net_src_port": 40470, "net_src_total_packets": 2, "net_src_total_bytes": 145, "net_dst_ip": "173.203.99.19", "net_dst_port": 6667, "net_dst_total_packets": 2, "net_dst_total_bytes": 24, "net_protocol": 6, "timestamp": "2012-12-03 05:14:37", "time_duration": 0, "net_src_flags": 161, "net_dst_flags": 24, "file_name_start": "pcap.1354511673", "file_offset_start": 7460, "file_name_end": "pcap.1354511673", "file_offset_end": 8580, "meta": "", "meta_cxt_id": 1354511677000000004},
    // {"id": "4c8fd7f359127b4b9e5de64a5e42c15659317e799689d1f1f89c9bdd10b0d0a9", "node_id": "4e01c629dded78450d09f6e6da5660678d6918ca6c4a6e5316d6367f2d2a5023", "ssn_corr_id": "f8adb368ae49bcaaea366e67fdae14e925282b59d1d426f6556f04164ff10b02", "time_start": "2012-12-03 05:14:37", "time_end": "2012-12-03 05:14:37", "net_version": 2, "net_src_ip": "173.255.243.154", "net_src_port": 40470, "net_src_total_packets": 2, "net_src_total_bytes": 145, "net_dst_ip": "173.203.99.19", "net_dst_port": 6667, "net_dst_total_packets": 2, "net_dst_total_bytes": 24, "net_protocol": 6, "timestamp": "2012-12-03 05:14:37", "time_duration": 0, "net_src_flags": 161, "net_dst_flags": 24, "file_name_start": "pcap.1354511673", "file_offset_start": 7460, "file_name_end": "pcap.1354511673", "file_offset_end": 8580, "meta": "", "meta_cxt_id": 1354511677000000004},
  // ];

  var searchMatch = function (haystack, needle) {
    if( !needle ) {
      return true;
    }

    return haystack.toString().toLowerCase().indexOf(needle.toLowerCase()) !== -1;
  };

    // init the filtered items
  $scope.search = function () {
    console.log("Items is " +$scope.items.length);
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
    if( $scope.sortField === newSortField )
      $scope.sortReverse ^= true;

    $scope.sortField = newSortField;
  };

  $scope.getSortClass = function(f) {
    if( $scope.sortField !== f )
      return '';

    return $scope.sortReverse ? 'sort-down' : 'sort-up';
  }

  //
  // INIT

  //$scope.search();
  echidnaService.setPage('sessions');
};


