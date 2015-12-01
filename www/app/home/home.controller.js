angular.module('lasius')
.controller('home.controller',[
	'$scope',
	'delayer.service',
	'Seeder',
	function($scope, Delayer, Seeder){

		$scope.fetchFollowing = new Delayer([fetchFollowing]);

		$scope.$on('$ionicView.beforeEnter', fetchFollowing);
		$scope.$on('doRefresh', fetchFollowing);

		function fetchFollowing(){
			return Seeder.prototype$getFollowing({
				id: $scope.currentUser.id,
				method: 'getFollowing'
			})
			.$promise.then(function(following){
				$scope.events = following.events;
			});
		}

	}
]);
