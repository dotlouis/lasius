angular.module('lasius')
.controller('profile.controller',[
	'$scope',
	'Seeder',
	function($scope, Seeder){
		$scope.$on('$ionicView.beforeEnter', function(){
			fetchProfile()
      .then(function(profile){
				$scope.profile = profile.profile;
      });
    });

		function fetchProfile(){
			return Seeder.prototype$getProfile({
				id: $scope.currentUser.id
			}).$promise;
		}
	}
]);
