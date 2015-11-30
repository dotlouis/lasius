angular.module('lasius')
.factory('apiInterceptor.service', [
  '$q',
  '$injector',
  '$rootScope',
  function($q, $injector, $rootScope){

  function isTemplate(config){
    if(config.url.indexOf('template.html') > -1)
      return true;
    return false;
  }

  var APIInterceptor = {
    // On request success
    request: function(config) {
      // Set a timeout for all request.
      // Past that time, the application is considered offline
      config.timeout = 5000;
      //Return the config or wrap it in a promise if blank.
      return config || $q.when(config);
    },

    // On request failure
    requestError: function(rejection) {
      // Return the promise rejection.
      return $q.reject(rejection);
    },

    // On response success
    response: function(response) {
      // Does not take into account template requests
      if(!isTemplate(response.config))
        $rootScope.$broadcast('serverAvailable', response.data);

      // Return the response or promise.
      return response || $q.when(response);
    },

    // On response failture
    responseError: function(rejection) {
      if(!isTemplate(rejection.config)){
        if(rejection.status === 0){
          rejection.data = {message:"Can't reach the server", name:"Error", status: 0, statusCode: 0};
          $rootScope.$broadcast('serverUnavailable', rejection.data);
        }
        else{
          $rootScope.$broadcast('serverAvailable', rejection.data);

          // rejection.data is required because of some weird unauthorized
          // Seeder/__anonymous__ request which doesn't have any data
          if(rejection.status === 401 && rejection.data){
            $rootScope.$broadcast('unauthorized', rejection);
          }
        }
      }

      // Return the promise rejection.
      return $q.reject(rejection);
    }
  };
  return APIInterceptor;
}]);
