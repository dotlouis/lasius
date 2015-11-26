angular.module('lasius')
.controller('event.controller',[
	'$scope',
  '$stateParams',
  '$q',
  'delayer.service',
	'Event',
	function($scope, $stateParams, $q, Delayer, Event){

    $scope.fetchEvent = new Delayer([fetchEvent]);

    $scope.$on('$ionicView.beforeEnter', function(){
      fetchEvent()
      .then(function(event){
        if(event.rrule)
          event.rruleText = RRule.fromString(event.rrule).toText();
        $scope.event = event;
      });
    });


    function fetchEvent(){
      // if the event is already passed from the previous state
      // we load it from here
      if($stateParams.event)
        return $q.when($stateParams.event);
      else
        return Event.get({
          id: $stateParams.id
        }).$promise;
    }
	}
]);
