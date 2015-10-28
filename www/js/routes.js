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
        signedUser: function(Seeder, $state){
          Seeder.getCurrent().$promise.then(function(){
            $state.go('app.home');
          });
        }
      }
    })
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/app.html',
      controller:'AppCtrl',
      resolve: {
        signedUser: function(Seeder, $state){
          return Seeder.getCurrent().$promise.catch(function(error){
            $state.go('welcome');
          });
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
