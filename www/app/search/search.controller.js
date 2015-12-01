angular.module('lasius')
.controller('search.controller',[
	'$scope',
	'$ionicModal',
	'$stateParams',
	'delayer.service',
	'query.service',
  'Event',
	function($scope, $ionicModal, $stateParams, Delayer, Query, Event){

		$scope.$on('$ionicView.enter', search);
		$scope.$on('doRefresh', search);

		$ionicModal.fromTemplateUrl('app/newEventModal/newEventModal.template.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.newEventModal = modal;
		});

    $scope.inputs = {
      query:''
    };

    $scope.search = new Delayer([search],{
      delay: 200,
      block: false
    });

    var eventQuery = new Query(Event);

    function search(){
			if(typeof $stateParams.query === 'string')
				$scope.inputs.query = $stateParams.query;

      return eventQuery.search($scope.inputs.query)
      .then(function(results){
        $scope.events = results.events;
      });
    }
	}
]);
