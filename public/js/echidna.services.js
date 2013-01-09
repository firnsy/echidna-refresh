App.factory('Session', ['$resource', function($resource) {
  return $resource('/api/sessions/:id',{
    id : '@id', 
  },{
    query:   { method : 'GET', isArray : true }, 
    save:    { method : 'PUT' },
    create:  { method: 'POST'},
    destroy: { method: 'DELETE'}
  })
}]);

App.factory('Event', ['$resource', function($resource) {
  return $resource('/api/events/:id',{
    id : '@id', 
  },{
    query:   { method : 'GET', isArray : true }, 
    save:    { method : 'PUT' },
    create:  { method: 'POST'},
    destroy: { method: 'DELETE'}
  })
}]);

App.factory('PassiveDNS', ['$resource', function($resource) {
  return $resource('/api/pdns/:id',{
    id : '@id', 
  },{
    query:   { method : 'GET', isArray : true }, 
    save:    { method : 'PUT' },
    create:  { method: 'POST'},
    destroy: { method: 'DELETE'}
  })
}]);
