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
			$scope.events = following.events.map(function(event){
				event.state = new Delayer([unfollow, follow]);
				return event;
			});
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

		function follow(event){
			return Seeder.prototype$follow({
				id:$scope.currentUser.id,
				eventId: event.id
			}).$promise;
		}

		function unfollow(event){
			return Seeder.prototype$unfollow({
				id:$scope.currentUser.id,
				eventId: event.id
			}).$promise;
		}

	}
]);
