function SessionController( $scope, $filter, echidnaService) {
$scope.$safeApply = function($scope, fn) {
  $scope = $scope || $rootScope;
  fn = fn || function() {};
  if($scope.$$phase) {
    fn();
  }
  else {
    $scope.apply(fn);
  }
  };
  $scope.sortReverse = false;
  $scope.filteredItems = [];
  $scope.groupedItems = [];
  $scope.pagedItems = [];
  $scope.currentPage = 0;

  $scope.pageSizes = [
    { name: '5', value: 5 },
    { name: '10', value: 10 },
    { name: '25', value: 25 },
    { name: '50', value: 50 },
    //{ name: 'All', value: $scope.items.length }
  ];

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
    if( $scope.sortField === newSortField )
      $scope.sortReverse ^= true;

    $scope.sortField = newSortField;
  };

  $scope.getSortClass = function(f) {
    if( $scope.sortField !== f )
      return '';

    return $scope.sortReverse ? 'sort-down' : 'sort-up';
  }

  console.log("SessionController["+$scope.parent+"]");

  $scope.items = [];
  $scope.items = echidnaService.findAllSessions();

  $scope.$safeApply($scope, function() {
    console.log("woot");
    //this function is run once the apply process is running or has just finished
  });

  $scope.sessionCount = function() {
    return $scope.items.length;
  };

  $scope.formatSessionSrc = function(e) {
    return e.net_src_ip + ':' + e.net_src_port;
  };

  $scope.formatSessionDst = function(e) {
    return e.net_dst_ip + ':' + e.net_dst_port;
  };

  $scope.formatProtocol = function(s) {
    return s.net_protocol;
  }

  $scope.priorityClass = function(priority) {
    return ( priority > 3 ) ? 'badge-priority-default' : 'badge-priority-' + priority;
  };

  $scope.toggleSessionDetails = function(e) {
    if( '_showDetails' in e )
      e._showDetails ^= true;
    else
      e._showDetails = true;

    console.log('showing details');
  };

  $scope.showSessionDetails = function(e) {
    return ( '_showDetails' in e ) &&
           ( e._showDetails );
  };

  //
  // PAGINATION
  $scope.sortField = 'time_start';
  //
  // INIT

  //$scope.search();
  echidnaService.setPage('session');
};
