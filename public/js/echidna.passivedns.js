var PassiveDNSCtrl = function($scope, $filter, $location, PassiveDNS) {
  console.log("PassiveDNSController");

  $scope.pageSizes = [
    { name: '10', value: 10 },
    { name: '25', value: 25 },
    { name: '50', value: 50 },
    { name: '100', value: 100 },
  ];
  $scope.sortField = 'timestamp';

  $scope.items = PassiveDNS.query({search: 'all'}, 
    // success callback
    function(data) {
      $("#progress-bar").css('display', 'none');

      if ($.isEmptyObject(data)) {
        $scope.items = [
          {"timestamp":1353554322,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"realtime.services.disqus.com.","query_type":"A","query_answer":"67.228.181.220","ttl":141},
          {"timestamp":1353554402,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"www.imdb.com.","query_type":"CNAME","query_answer":"us.dd.imdb.com.","ttl":2755},
        ];
       
      }

      $("#progress-bar").css('display', 'none');

      var summary = {};
      var items_by_query = {};
      _.each($scope.items, function(item) {
        var key = [ item.query, item.query_type, item.answer ].join(":");

        // summary creation
        if ( _.has(summary, key) ) {
          summary[key].push(item);
        }
        else {
          summary[key] = [item];
        }

        // src ip list that made a request to query name
        if (_.has(items_by_query, item.query)) {
          items_by_query[item.query].push(item.net_src_ip);
        }
        else {
          items_by_query[item.query] = [item.net_src_ip];
        }
      });
  
      _.each(items_by_query, function(src_ips, query) {
        items_by_query[query] = _.uniq(src_ips);
      });

      $scope.items_by_query = items_by_query;
  
      var pdns = [];
      _.each(summary, function(items, key) {
        var subkeys = key.split(":");
        var timestamp_callback = function(item) { return new Date(item.timestamp.replace(/-/g,"/")); };

        var first = _.min(items, timestamp_callback);
        var last  = _.max(items, timestamp_callback);

        pdns.push({
          query_name: subkeys[0],
          query_type: subkeys[1],
          query_answer: subkeys[2],
          first_seen: $scope.formatTimestamp(first.timestamp),
          last_seen: $scope.formatTimestamp(last.timestamp),
          ttl: last.ttl,
        });
      });

      $scope.items = pdns;

      $scope.pageSizes.push({ 
        name: 'All', value: $scope.items.length 
      });

      $scope.search();
    }, 
    // error callback
    function() {
      console.log("ERROR: Couldn't load data");
  });

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
      if ( i % $scope.pageSize.value === 0 ) {
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

  $scope.dnsCount = function() {
    return $scope.items.length;
  };

  $scope.toggleDNSDetails = function(e) {
    if( '_showDetails' in e )
      e._showDetails ^= true;
    else
      e._showDetails = true;

    console.log('showing details');
  };

  $scope.formatTimestamp = function(t) {
    return t;
  }

  $scope.showSrcIps = function(d) {
    return $scope.items_by_query[d.query_name];
  };

};

PassiveDNSCtrl.$inject = ['$scope', '$filter', '$location', 'PassiveDNS'];
