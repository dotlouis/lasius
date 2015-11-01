angular.module('lasius')
.controller('HomeCtrl',[
	'$scope',
	'$ionicModal',
	'DelayerService',
	'Seeder',
	function($scope, $ionicModal, Delayer, Seeder){

		$scope.fetchFollowing = new Delayer([fetchFollowing])
		.toggle()
		.then(function(following){
			$scope.events = following.events;
		});

		$ionicModal.fromTemplateUrl('templates/createEventModal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.createEventModal = modal;
		});

		function fetchFollowing(){
			return Seeder.prototype$getFollowing({
				id: $scope.currentUser.id
			}).$promise;
		}

	}
]);
