angular.module('lasius')
.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$ionicConfigProvider',
  function($stateProvider, $urlRouterProvider, $ionicConfigProvider){

    $stateProvider
    .state('welcome',{
      url:'/welcome',
      templateUrl:'templates/welcome.html',
      controller:'WelcomeCtrl',
      resolve: {
        signedUser: function(Seeder, $q){
          // if the user is authenticated, we don't resolve so he
          // can't access the welcome state
          if(Seeder.isAuthenticated())
            return $q.reject();
        }
      }
    })
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/app.html',
      controller:'AppCtrl',
      resolve: {
        signedUser: function(Seeder, $q){
          // if the user exists/is authenticated, we resolve with it's value
          // so the controllers are only loaded when the user value is injected

          // why the hell is this null ?
          console.log(Seeder.getCachedCurrent());
          // in the futur, try to load a cached user instead of hitting the
          // network each time the app is loaded into memory
          return Seeder.getCurrent().$promise;
        }
      }
    })
    .state('app.home', {
      url: '/home',
      views: {
        'main@app': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    });
    // if none of the above states are matched, use this as the fallback
    // see https://github.com/Narzerus/angular-permission/issues/65#issuecomment-107104983
    $urlRouterProvider.otherwise(function($injector) {
      var $state = $injector.get("$state");
      $state.go('app.home');
    });
  }
]);
