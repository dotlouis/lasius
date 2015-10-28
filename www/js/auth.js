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
        // http://docs.strongloop.com/display/public/LB/AngularJS+JavaScript+SDK#AngularJSJavaScriptSDK-Handling401Unauthorized
        $httpProvider.interceptors.push(function($q, $location) {
            return {
                responseError: function(rejection) {
                    // Server down or does not answer
                    // Does something to report and queue tasks that can't be executed
                    // due to non 20X status
                    if(rejection.status === 0)
                      rejection.data = {error:{message:"Can't reach the server", name:"Error", status: 0, statusCode: 0}};
                    return $q.reject(rejection.data.error);
                }
            };
        });
}])

// The roles defined for front-end auth routing (see routes.js)
// https://github.com/Narzerus/angular-permission#defining-roles
.run([
    'Permission',
    'Seeder',
    function(Permission, Seeder){
        Permission.defineRole('anonymous', function(stateParams){
            if(!Seeder.isAuthenticated())
                return true;
            return false;
        });
}]);
