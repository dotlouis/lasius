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

    $authProvider.baseUrl = APP_CONFIG.API_PATH;
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
      url: '/Seeders/facebook',
      clientId: APP_CONFIG.FB_APP_ID,
      scope: ['public_profile','email','user_friends']
    }));

    // Handling errors
    $httpProvider.interceptors.push('apiInterceptor.service');
  }
])

.run([
  '$rootScope',
  '$state',
  '$ionicHistory',
  '$ionicPopup',
  'auth.service',
  'Seeder',
  function($rootScope, $state, $ionicHistory, $ionicPopup, Auth, Seeder){
  // Inform user and logout when Unauthorized response
  $rootScope.$on('unauthorized',function(event, args){
    $ionicPopup.alert({
      title: 'An error occurred!',
      template: 'You have been logged out'
    })
    .then(function(res){
      Auth.logout()
      .finally(function(){
        $ionicHistory.nextViewOptions({
          disableBack: false,
          historyRoot: true
        });
        $state.go('welcome');
      });
    });
   });

}]);
