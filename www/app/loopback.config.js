angular.module('lasius')
// Replace the resource object created by loopback service generator
// by a cachedResource object to enable offline behavior
.decorator('LoopBackResource',[
  '$delegate',
  '$cachedResource',
  function($delegate, $cachedResource, APP_CONFIG){
    return function(url, params, actions) {

      // the only line that changed from the original resource definition
      // see LoopBackResource in lb-services
      var resource = $cachedResource(url, url, params, actions);

      resource.prototype.$save = function(success, error) {
        var result = resource.upsert.call(this, {}, this, success, error);
        return result.$promise || result;
      };
      return resource;
    };
  }
])
.config([
    'LoopBackResourceProvider',
    'APP_CONFIG',
    function(LoopBackResourceProvider, APP_CONFIG){
      // Change the URL where to access the LoopBack REST API server
      LoopBackResourceProvider.setUrlBase(APP_CONFIG.API_PATH);
}]);
