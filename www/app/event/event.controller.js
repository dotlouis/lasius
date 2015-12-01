angular.module('lasius')
.controller('event.controller',[
	'$scope',
  '$stateParams',
  '$q',
  'delayer.service',
	'Event',
	function($scope, $stateParams, $q, Delayer, Event){

    $scope.fetchEvent = new Delayer([fetchEvent]);

    $scope.$on('$ionicView.beforeEnter', fetchEvent);
		$scope.$on('doRefresh', fetchEvent);

    function fetchEvent(){
      // if the event is already passed from the previous state
      // we load it from here
			var eventReq;
      if($stateParams.event)
        eventReq = $q.when($stateParams.event);
      else
        eventReq = Event.get({
          id: $stateParams.id
        }).$promise;

			eventReq.then(function(event){
				if(event.rrule)
					event.rruleText = RRule.fromString(event.rrule).toText();
				$scope.event = event;
			});
    }
	}
]);
