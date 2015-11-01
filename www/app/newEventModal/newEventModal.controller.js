angular.module('lasius')
.controller('newEventModal.controller',[
  '$scope',
  'delayer.service',
  'Seeder',
  function($scope, Delayer, Seeder){

    $scope.newEvent = {};
    $scope.createEvent = new Delayer([createEvent]);

    function createEvent(){
      $scope.newEventModal.hide();
      return Seeder.prototype$newEvent({
        id: $scope.currentUser.id
      }, $scope.newEvent).$promise;
    }

  }
]);
