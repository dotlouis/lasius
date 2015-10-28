angular.module('lasius')
.constant('APP_CONFIG',{
    VERSION: '1',
    FB_APP_ID: '1438646329798081',
    API_ENDPOINT: 'http://localhost:3005'
    // API_ENDPOINT: 'https://studloop-studant.rhcloud.com'
})

.config([
    'LoopBackResourceProvider',
    'APP_CONFIG',
    function(LoopBackResourceProvider, APP_CONFIG){
        // Change the URL where to access the LoopBack REST API server
        LoopBackResourceProvider.setUrlBase(APP_CONFIG.API_ENDPOINT+'/api');
}]);
