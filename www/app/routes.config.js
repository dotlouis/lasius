angular.module('lasius')
.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$ionicConfigProvider',
  function($stateProvider, $urlRouterProvider, $ionicConfigProvider){

    $stateProvider
    .state('welcome',{
      url:'/welcome',
      templateUrl:'app/welcome/welcome.template.html',
      controller:'welcome.controller',
      resolve: {
        signedUser: function(Seeder, $q, $state){
          // if the user is authenticated, we don't resolve so he
          // can't access the welcome state
          if(Seeder.isAuthenticated())
            return $q.reject()
            .catch(function(){
              $state.go('app.home');
            });
        }
      }
    })
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'app/main/main.template.html',
      controller:'main.controller',
      resolve: {
        signedUser: function(Seeder, $state){
          // if the user exists/is authenticated, we resolve with it's value
          // so the controllers are only loaded when the user value is injected

          // why the hell is this null ?
          // console.log(Seeder.getCachedCurrent());

          // in the futur, try to load a cached user instead of hitting the
          // network each time the app is loaded into memory
          return Seeder.getCurrent().$promise
          .catch(function(){
            $state.go('welcome');
          });
        }
      }
    })
    .state('app.home', {
      url: '/home',
      views: {
        'main@app': {
          templateUrl: 'app/home/home.template.html',
          controller: 'home.controller'
        }
      }
    })
    .state('app.search', {
      url: '/search',
      views: {
        'main@app': {
          templateUrl: 'app/search/search.template.html',
          controller: 'search.controller'
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
