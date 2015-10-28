angular.module('lasius')
.controller('AppCtrl',[
  '$scope',
  '$state',
  '$ionicHistory',
  'Seeder',
  'AuthService',
  '$ionicPopover',
  function($scope, $state, $ionicHistory, Seeder, Auth,$ionicPopover){

    $scope.currentUser = Seeder.getCachedCurrent();
    console.log($scope.currentUser);

    Seeder.getCurrent()
    .$promise.then(function(user){
      $scope.currentUser = user;
      console.log(user);
    });

    $scope.logout = function(){
      Auth.logout();
      $ionicHistory.nextViewOptions({
        disableBack: false,
        historyRoot: true
      });
      $state.go('welcome');
    };

    $ionicPopover.fromTemplateUrl('templates/menuPopover.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.popover = popover;
    });

    $scope.openPopover = function($event) {
      $scope.popover.show($event);
    };

}]);
