angular.module('lasius')
.controller('home.controller',[
	'$scope',
	'delayer.service',
	'Seeder',
	function($scope, Delayer, Seeder){

		$scope.$on('$ionicView.beforeEnter', function(){
			fetchCalendar()
			.then(function(calendar){
				$scope.calendar = calendar.calendar;
			});
		});

		function fetchCalendar(mode){
			if(mode !== 'flat')
				delete mode;

			return Seeder.prototype$getCalendar({
				id: $scope.currentUser.id,
				mode: mode
			}).$promise;
		}

	}
]);
