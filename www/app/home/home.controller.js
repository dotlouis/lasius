angular.module('lasius')
.controller('home.controller',[
	'$scope',
	'delayer.service',
	'Seeder',
	function($scope, Delayer, Seeder){

		$scope.fetchCalendar = new Delayer([fetchCalendar]);

		$scope.$on('$ionicView.beforeEnter', fetchCalendar);
		$scope.$on('doRefresh', fetchCalendar);

		function fetchCalendar(){
			return Seeder.prototype$getCalendar({
				id: $scope.currentUser.id,
				method: 'getCalendar'
			})
			.$promise.then(function(calendar){
				$scope.calendar = calendar.calendar;
			});
		}

	}
]);
