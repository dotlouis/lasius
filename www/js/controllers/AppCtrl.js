angular.module('lasius')
.controller('AppCtrl',[
  '$scope',
  '$state',
  '$ionicHistory',
  'Seeder',
  'signedUser',
  'AuthService',
  '$ionicPopover',
  function($scope, $state, $ionicHistory, Seeder, signedUser, Auth, $ionicPopover){

    $scope.currentUser = signedUser;

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
