angular.module('lasius')
.factory('apiInterceptor.service', [
  '$q',
  '$injector',
  '$rootScope',
  function($q, $injector, $rootScope){

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

      // Return the response or promise.
      return response || $q.when(response);
    },

    // On response failture
    responseError: function(rejection) {

      // This will capture all HTTP errors such as 401 errors so be careful with your code. You can however
      // examine the "rejection" object so you can add more filtering

      if(rejection.status === 0){
        rejection.data = {message:"Can't reach the server", name:"Error", status: 0, statusCode: 0};
        $rootScope.$broadcast('serverUnavailable', rejection.data);
      }
      // http://docs.strongloop.com/display/public/LB/AngularJS+JavaScript+SDK#AngularJSJavaScriptSDK-Handling401Unauthorized
      else if(rejection.status === 401)
        $rootScope.$broadcast('unauthorized', {message: 'you have been logged out'});

      // Return the promise rejection.
      return $q.reject(rejection);
    }
  };
  return APIInterceptor;
}]);
