angular.module('lasius')
.controller('HomeCtrl',[
	'$scope',
	'$ionicModal',
	'DelayerService',
	'Seeder',
	function($scope, $ionicModal, Delayer, Seeder){

		$scope.newEvent = {};
		$scope.createEvent = new Delayer([createEvent]);
		$scope.fetchFollowing = new Delayer([fetchFollowing]);

		$scope.fetchFollowing.toggle()
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
				id:$scope.currentUser.id
			}).$promise;
		}

		function createEvent(newEvent){
			$scope.createEventModal.hide();
			return Seeder.prototype$newEvent({
				id:$scope.currentUser.id
			},newEvent).$promise;
		}

	}
]);
