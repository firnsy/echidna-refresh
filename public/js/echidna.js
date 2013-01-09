// Application Singleton
var Echidna = {};
var App = angular.module('Echidna', ['ngResource']);

App.config(['$routeProvider', function($route) {
  $route.when('/', {
    templateUrl: 'tmpl/dashboard.html',
    controller: DashboardCtrl
  })
  .when('/events', {
    templateUrl: 'tmpl/events.html',
    controller: EventCtrl
  })
  .when('/sessions', {
    templateUrl: 'tmpl/sessions.html',
    controller: SessionCtrl
  })
  .when('/pdns', {
    templateUrl: 'tmpl/pdns.html',
    controller: PassiveDNSCtrl
  })
  .otherwise({
    redirectTo: '/dashboard'
  });

}]);

/* angularfy some bootstrap directives */
App.directive('tooltip', function() {
    return {
      restrict:'A',
      link: function(scope, element, attrs) {
        var _p = attrs.position || 'left';
        $(element).tooltip( { placement: _p } );
      }
    }
  })
  .controller('NavigationCtrl', function($scope) {
    $scope._page = 'dashboard';

    $scope.$on('pageChanged', function(event, page) {
      $scope._page = page;
    });

    $scope.classPageActive = function(page) {
      if( page === 'nsm-data' ) {
        return ( [ 'events', 'sessions', 'objects', 'passivedns' ].indexOf($scope._page) != -1 ) ? 'active' : '';
      }

      return ( page === $scope._page ) ? 'active' : '';
    };
  });


var windowResizeHelper = function() {
  var _w = $(window).width();

  console.log(_w);

  var _ul = $('#sidebar > ul');

  if( _w <= 478 ) {
    _ul.css({'display':'none'});
  }
  else if( _w > 479 ) {
    _ul.css({'display':'block'});
    $('#content-header .btn-group').css({width:'auto'});
  }
  else if( _w > 768 ) {
    $('#user-nav > ul').css({width:'auto',margin:'0'});
    $('#content-header .btn-group').css({width:'auto'});
  }
};


$(document).ready(function() {
  $('.submenu > a').click(function(e) {
    e.preventDefault();
    var submenu = $(this).siblings('ul');
    var li = $(this).parents('li');
    var submenus = $('#sidebar li.submenu ul');
    var submenus_parents = $('#sidebar li.submenu');
    if( li.hasClass('open') ) {
      if(( $(window).width() > 768 ) || ( $(window).width() < 479) ) {
        submenu.slideUp();
      }
      else {
        submenu.fadeOut(250);
      }
      li.removeClass('open');
    }
    else {
      if( ($(window).width() > 768 ) || ( $(window).width() < 479) ) {
        submenus.slideUp();
        submenu.slideDown();
      }
      else {
        submenus.fadeOut(250);
        submenu.fadeIn(250);
      }

      submenus_parents.removeClass('open');
      li.addClass('open');
    }
  });

  var ul = $('#sidebar > ul');

  $('#sidebar > a').click(function(e) {
    e.preventDefault();
    var sidebar = $('#sidebar');

    if( sidebar.hasClass('open') ) {
      sidebar.removeClass('open');
      ul.slideUp(250);
    }
    else {
      sidebar.addClass('open');
      ul.slideDown(250);
    }
  });

  /* update select parameters on windo resizing */
  $(window).resize( windowResizeHelper() );

  if( $(window).width() <= 468 ) {
    ul.css({'display':'none'});
  }
  if( $(window).width() > 479 ) {
    $('#content-header .btn-group').css({width:'auto'});
    ul.css({'display':'block'});
  }

  if ($("[rel=tooltip]").length) {
    $("[rel=tooltip]").tooltip();
  }
});
