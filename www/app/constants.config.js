angular.module('lasius')
// self-executing functions as constant:
// http://michalostruszka.pl/blog/2012/12/23/angular-better-constant-values/
.constant('APP_CONFIG',(function(){
  var params = {
    VERSION: '1',
    FB_APP_ID: '1438646329798081',
    API_HOST: 'http://localhost:3005',
    // API_HOST: 'https://studloop-studant.rhcloud.com'
    API_VERSION: '1',
    API_ENDPOINT: '/api'
  };
  params.API_PATH = params.API_HOST+params.API_ENDPOINT+'/v'+params.API_VERSION;
  return params;
})());
