angular.module('lasius')
.controller('eventCard.controller',[
  '$scope',
  'delayer.service',
  'Seeder',
  function($scope, Delayer, Seeder){

    $scope.event.state = new Delayer([unfollow, follow]);

    function follow(){
      return Seeder.prototype$follow({
        id: $scope.currentUser.id,
        eventId: $scope.event.id
      }).$promise;
    }

    function unfollow(){
      return Seeder.prototype$unfollow({
        id: $scope.currentUser.id,
        eventId: $scope.event.id
      }).$promise;
    }
  }
]);
