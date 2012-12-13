var app = angular.module('echidna', []).
  config(function($routeProvider) {
    $routeProvider.
      when('/dashboard', { templateUrl: '/dashboard.html', controller: DashboardCtrl}).
      when('/events', { templateUrl: '/events.html', controller: EventsCtrl}).
      when('/sessions', { templateUrl: '/sessions.html', controller: SessionsCtrl}).
      when('/pdns', { templateUrl: '/pdns.html', controller: PassiveDNSCtrl}).
      otherwise({redirectTo: '/dashboard'});
  });


/* angularfy some bootstrap directives */
app.directive('tooltip', function() {
  return {
    restrict:'A',
    link: function(scope, element, attrs) {
      var _p = attrs.position || 'left';
      $(element).tooltip( { placement: _p } );
    }
  }
});


$(document).ready(function(){
  $('.submenu > a').click(function(e)
  {
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
  $(window).resize(function() {
    var _w = $(window).width();

    if( _w <= 478 ) {
      ul.css({'display':'none'});
      fix_position();
    }
    else if( _w > 479 ) {
      ul.css({'display':'block'});
      $('#content-header .btn-group').css({width:'auto'});
    }
    else if( _w > 768 ) {
      $('#user-nav > ul').css({width:'auto',margin:'0'});
      $('#content-header .btn-group').css({width:'auto'});
    }
  });

  if( $(window).width() <= 468 ) {
    ul.css({'display':'none'});
    fix_position();
  }
  if( $(window).width() > 479 ) {
    $('#content-header .btn-group').css({width:'auto'});
    ul.css({'display':'block'});
  }

  /* fix position of buttons group in top user navigation */
  function fix_position() {
    var uwidth = $('#user-nav > ul').width();
    $('#user-nav > ul').css({width:uwidth,'margin-left':'-' + uwidth / 2 + 'px'});
  }
});
