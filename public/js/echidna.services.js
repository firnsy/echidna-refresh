window.app.service('echidnaService', function($rootScope, $resource) {
  var _data = {
    events: [],
    sessions: [],
    passivedns: [],
    objects: []
};

  var Event   = $resource('/api/events/:id',   {id: '@id'});
  var Session = $resource('/api/sessions/:id', {id: '@id'});

  var _activePage = 'dashboard';

  return {
    findAllEvents:   function() { return Event.query();   },
    findAllSessions: function() { return Session.query(); },
    setPage: function(page) {
        _activePage = page;

        $rootScope.$broadcast('pageChanged', _activePage);
    },
      getPage: function() {
    },
  };
})
