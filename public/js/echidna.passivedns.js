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
          {"timestamp":1353554322,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"realtime.services.disqus.com.","query_type":"A","query_answer":"67.228.181.218","ttl":141},
          {"timestamp":1353554322,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"realtime.services.disqus.com.","query_type":"A","query_answer":"67.228.181.219","ttl":141},
          {"timestamp":1353554342,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"tvrage.com.","query_type":"A","query_answer":"80.246.178.98","ttl":5190},
          {"timestamp":1353554342,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"www.amazon.co.uk.","query_type":"A","query_answer":"178.236.7.220","ttl":4},
          {"timestamp":1353554402,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"allmusic.com.","query_type":"A","query_answer":"144.198.225.72","ttl":120},
          {"timestamp":1353554402,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"www.imdb.com.","query_type":"CNAME","query_answer":"us.dd.imdb.com.","ttl":2755},
          {"timestamp":1353554402,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"www.imdb.com.","query_type":"A","query_answer":"207.171.162.180","ttl":12},
          {"timestamp":1353554402,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"www.newzbin2.es.","query_type":"A","query_answer":"85.112.165.88","ttl":35921},
          {"timestamp":1353554403,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"www.tvrage.com.","query_type":"A","query_answer":"80.246.178.98","ttl":6865},
          {"timestamp":1353554492,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"www.imdb.com.","query_type":"A","query_answer":"72.21.215.52","ttl":6},
          {"timestamp":1353554501,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"github.com.","query_type":"A","query_answer":"207.97.227.239","ttl":100},
          {"timestamp":1353554503,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"a248.e.akamai.net.","query_type":"A","query_answer":"61.9.129.151","ttl":9},
          {"timestamp":1353554503,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"a248.e.akamai.net.","query_type":"A","query_answer":"61.9.129.145","ttl":9},
          {"timestamp":1353554503,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"ssl.google-analytics.com.","query_type":"CNAME","query_answer":"ssl-google-analytics.l.google.com.","ttl":1966},
          {"timestamp":1353554503,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"ssl.google-analytics.com.","query_type":"A","query_answer":"74.125.237.158","ttl":113},
          {"timestamp":1353554503,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"secure.gravatar.com.","query_type":"CNAME","query_answer":"lb.gravatar.com.","ttl":3600},
          {"timestamp":1353554503,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"secure.gravatar.com.","query_type":"A","query_answer":"72.233.61.125","ttl":75},
          {"timestamp":1353554503,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"secure.gravatar.com.","query_type":"A","query_answer":"72.233.69.4","ttl":75},
          {"timestamp":1353554503,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"secure.gravatar.com.","query_type":"A","query_answer":"72.233.69.5","ttl":75},
          {"timestamp":1353554503,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"secure.gravatar.com.","query_type":"A","query_answer":"72.233.61.123","ttl":75},
          {"timestamp":1353554504,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"secure.gaug.es.","query_type":"A","query_answer":"64.22.108.249","ttl":1359},
          {"timestamp":1353554514,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"clients4.google.com.","query_type":"CNAME","query_answer":"clients.l.google.com.","ttl":214},
          {"timestamp":1353554514,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"clients4.google.com.","query_type":"A","query_answer":"74.125.237.130","ttl":299},
          {"timestamp":1353554514,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"clients4.google.com.","query_type":"A","query_answer":"74.125.237.137","ttl":299},
          {"timestamp":1353554514,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"clients4.google.com.","query_type":"A","query_answer":"74.125.237.136","ttl":299},
          {"timestamp":1353554514,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"clients4.google.com.","query_type":"A","query_answer":"74.125.237.134","ttl":299},
          {"timestamp":1353554514,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"clients4.google.com.","query_type":"A","query_answer":"74.125.237.142","ttl":299},
          {"timestamp":1353554514,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"clients4.google.com.","query_type":"A","query_answer":"74.125.237.131","ttl":299},
          {"timestamp":1353554514,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"clients4.google.com.","query_type":"A","query_answer":"74.125.237.135","ttl":299},
          {"timestamp":1353554514,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"clients4.google.com.","query_type":"A","query_answer":"74.125.237.133","ttl":299},
          {"timestamp":1353554514,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"clients4.google.com.","query_type":"A","query_answer":"74.125.237.128","ttl":299},
          {"timestamp":1353554514,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"clients4.google.com.","query_type":"A","query_answer":"74.125.237.129","ttl":299},
          {"timestamp":1353554514,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"clients4.google.com.","query_type":"A","query_answer":"74.125.237.132","ttl":299},
          {"timestamp":1353554522,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"www.amazon.co.uk.","query_type":"A","query_answer":"178.236.6.251","ttl":6},
          {"timestamp":1353554612,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"www.amazon.co.uk.","query_type":"A","query_answer":"176.32.108.186","ttl":50},
          {"timestamp":1353554612,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"www.imdb.com.","query_type":"A","query_answer":"72.21.203.211","ttl":60},
          {"timestamp":1353554432,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"www.amazon.co.uk.","query_type":"A","query_answer":"178.236.7.220","ttl":37},
          {"timestamp":1353554552,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"www.imdb.com.","query_type":"A","query_answer":"72.21.215.52","ttl":25},
          {"timestamp":1353554612,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"www.imdb.com.","query_type":"CNAME","query_answer":"us.dd.imdb.com.","ttl":3099},
          {"timestamp":1353554612,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"tvrage.com.","query_type":"A","query_answer":"80.246.178.98","ttl":5190},
          {"timestamp":1353554684,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"realtime.services.disqus.com.","query_type":"A","query_answer":"67.228.181.219","ttl":478},
          {"timestamp":1353554684,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"realtime.services.disqus.com.","query_type":"A","query_answer":"67.228.181.218","ttl":478},
          {"timestamp":1353554684,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"realtime.services.disqus.com.","query_type":"A","query_answer":"67.228.181.220","ttl":478},
          {"timestamp":1353554612,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"www.tvrage.com.","query_type":"A","query_answer":"80.246.178.98","ttl":6993},
          {"timestamp":1353554612,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"www.newzbin2.es.","query_type":"A","query_answer":"85.112.165.88","ttl":35921},
          {"timestamp":1353554672,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"allmusic.com.","query_type":"A","query_answer":"144.198.225.72","ttl":300},
          {"timestamp":1354408877,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"realtime.services.disqus.com.","query_type":"A","query_answer":"67.228.181.219","ttl":382},
          {"timestamp":1354408877,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"realtime.services.disqus.com.","query_type":"A","query_answer":"67.228.181.218","ttl":382},
          {"timestamp":1354408877,"net_src_ip":"192.168.10.20","net_dst_ip":"192.168.10.1","rr_class":"IN","query":"realtime.services.disqus.com.","query_type":"A","query_answer":"67.228.181.220","ttl":382}
        ];
       
      }

      $("#progress-bar").css('display', 'none');

      var summary = {};
      var items_by_query = {};
      _.each($scope.items, function(item) {
        var key = [ item.query, item.query_type, item.query_answer ].join(":");

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
        var timestamp_callback = function(item) { return item.timestamp; };

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
      console.log($scope.items);

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
    var date = new Date(t * 1000);
    var ymd = [date.getFullYear(), date.getMonth()+1, date.getDate()].join("-");

    var hms = _.map([date.getHours(), date.getMinutes(), date.getSeconds()], function(value) {
      if (value.toString().length == 2) {
        return value;
      }
      else {
        return "0"+value;
      }
    }).join(":");

    return [ymd, hms].join(" ");
  }

  $scope.showSrcIps = function(d) {
    console.log($scope.items_by_query[d.query_name]);
    return $scope.items_by_query[d.query_name];
  };
};

PassiveDNSCtrl.$inject = ['$scope', '$filter', '$location', 'PassiveDNS'];
