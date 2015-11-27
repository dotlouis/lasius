angular.module('lasius')
.config([
    'LoopBackResourceProvider',
    'APP_CONFIG',
    function(LoopBackResourceProvider, APP_CONFIG){
      // Change the URL where to access the LoopBack REST API server
      LoopBackResourceProvider.setUrlBase(APP_CONFIG.API_PATH);
}]);
