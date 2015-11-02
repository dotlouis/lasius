angular.module('lasius')
.controller('search.controller',[
	'$scope',
	'$ionicModal',
	'delayer.service',
	'Event',
	function($scope, $ionicModal, Delayer, Event){

    $scope.inputs = {
      query:''
    };

    $scope.search = new Delayer([search],{
      delay: 200,
      block: false
    });

    function search(){
      return Event.esSearch({
        queryString: $scope.inputs.query
      }).$promise
      .then(function(results){
        $scope.events = results.events;
      });
    }
	}
]);
