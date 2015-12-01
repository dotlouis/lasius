angular.module('lasius')
.directive('snackbar', [
  '$rootScope',
  '$window',
  '$timeout',
  function($rootScope, $window, $timeout){
    return {
        restrict: 'E',
        templateUrl: 'app/snackbar/snackbar.template.html',
        scope: {
          refreshFn: '&'
        },
        link: function(scope, element, attrs){

          scope.refreshFn = scope.refreshFn || angular.noop;
          scope.isOnline = navigator.onLine;
          scope.message = "No connection";

          scope.refresh = function(){
            scope.refreshFn();
            scope.isFetching = true;
          };

          function online(){
            scope.isOnline = true;
            scope.isFetching = false;
          }

          function offline(){
            scope.isOnline = false;
            $timeout(function(){
              scope.isFetching = false;
            }, 1500);
          }

          // Listen for the navigator.onLine change
          $window.addEventListener('offline', function(){
            $rootScope.$broadcast('serverUnavailable');
          }, false);
          $window.addEventListener("online", function(){
            $rootScope.$broadcast('serverAvailable');
          }, false);

          // Listen for failling requests
          $rootScope.$on('serverUnavailable', offline);
          $rootScope.$on('serverAvailable', online);
        }
    };
  }
]);
