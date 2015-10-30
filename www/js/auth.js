angular.module('lasius')
.config([
  '$authProvider',
  '$httpProvider',
  'APP_CONFIG',
  function($authProvider, $httpProvider, APP_CONFIG) {

    var commonConfig = {
      // OAuth popup should appear with no location bar/toolbar on mobile
      popupOptions: {
        location: 'no',
        toolbar: 'no'
      }
    };

    $authProvider.baseUrl = APP_CONFIG.API_ENDPOINT;
    // important ! otherwise the auth token does not get recognized
    // leading to Unauthorized server response.
    $authProvider.authHeader = 'Satellizer';

    // if the app is served from the filesystem, the redirectUri must be
    // set to localhost because file:// is not a supported redirectUri
    if(window.location.protocol == 'file:')
      commonConfig.redirectUri = 'http://localhost/';

    if(ionic.Platform.isIOS() || ionic.Platform.isAndroid())
      $authProvider.platform = 'mobile';

    $authProvider.facebook(angular.extend(commonConfig,{
      url: '/api/Seeders/facebook',
      clientId: APP_CONFIG.FB_APP_ID,
      scope: ['public_profile','email','user_friends']
    }));

    // Handling errors
    $httpProvider.interceptors.push('APIInterceptor');
  }
])

.run(['$rootScope','$state','AuthService','Seeder',function($rootScope, $state, Auth, Seeder){
  // don't logout whenever there is an unauthorize.
  // prefer a message (in theory this should never happen)
  // logout only when the getCurrentId fails.
  $rootScope.$on('unauthorized',function(event, args){
    Auth.logout();
    $state.go('welcome', { message: args.message });
  });
  $rootScope.$on('serverUnavailable',function(event, args){
    // for now logout the user to avoid a BSoD
    // in the futur implement some kind of cache so even if the server
    // is unavailable the user can still use the app.
    // see the resolve function in routes.js
      Auth.logout();
      $state.go('welcome', { message: args.message });
  });
}]);
