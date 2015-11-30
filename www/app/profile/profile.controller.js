angular.module('lasius')
.controller('profile.controller',[
	'$scope',
	'Seeder',
	function($scope, Seeder){

		$scope.$on('$ionicView.beforeEnter', fetchProfile);
		$scope.$on('doRefresh', fetchProfile);

		function fetchProfile(){
			return Seeder.prototype$getProfile({
				id: $scope.currentUser.id,
				method: 'getProfile'
			}).$promise
			.then(function(profile){
				console.log(profile);
				$scope.profile = profile.profile;
      });
		}
	}
]);
