angular.module('lasius')
.controller('newEventModal.controller',[
  '$scope',
  'delayer.service',
  'Seeder',
  function($scope, Delayer, Seeder){

    $scope.inputs = {
      title: '',
      body: ''
    };
    
    $scope.newEvent = new Delayer([newEvent]);

    function newEvent(){
      $scope.newEventModal.hide();
      return Seeder.prototype$newEvent({
        id: $scope.currentUser.id
      }, $scope.inputs).$promise;
    }

  }
]);
