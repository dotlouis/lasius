angular.module('lasius')
.controller('search.controller',[
	'$scope',
	'$ionicModal',
	'delayer.service',
	'query.service',
  'Event',
	function($scope, $ionicModal, Delayer, Query, Event){

    $scope.inputs = {
      query:''
    };

    $scope.search = new Delayer([search],{
      delay: 200,
      block: false
    });

    var eventQuery = new Query(Event);

    function search(){
      return eventQuery.search($scope.inputs.query)
      .then(function(results){
        $scope.events = results.events;
      });
    }
	}
]);
