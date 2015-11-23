angular.module('lasius')
.controller('newEventModal.controller',[
  '$scope',
  'delayer.service',
  'Seeder',
  function($scope, Delayer, Seeder){

    $scope.inputs = {};

    // reset the title and body each time the modal is shown
    $scope.$on('modal.shown', function(){
      $scope.inputs.title = '';
      $scope.inputs.body = '';
    });

    $scope.newEvent = new Delayer([newEvent]);

    function newEvent(){
      $scope.newEventModal.hide();
      return Seeder.prototype$newEvent({
        id: $scope.currentUser.id
      }, $scope.inputs).$promise;
    }

  }
]);
