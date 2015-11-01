angular.module('lasius')
.controller('CreateEventCtrl',[
  '$scope',
  'DelayerService',
  'Seeder',
  function($scope, Delayer, Seeder){

    $scope.newEvent = {};
    $scope.createEvent = new Delayer([createEvent]);

    function createEvent(){
      $scope.createEventModal.hide();
      return Seeder.prototype$newEvent({
        id: $scope.currentUser.id
      }, $scope.newEvent).$promise;
    }

  }
]);
