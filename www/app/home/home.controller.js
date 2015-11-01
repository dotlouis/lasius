angular.module('lasius')
.controller('home.controller',[
	'$scope',
	'$ionicModal',
	'delayer.service',
	'Seeder',
	function($scope, $ionicModal, Delayer, Seeder){

		$scope.fetchFollowing = new Delayer([fetchFollowing])
		.toggle()
		.then(function(following){
			$scope.events = following.events;
		});

		$ionicModal.fromTemplateUrl('app/newEventModal/newEventModal.template.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.newEventModal = modal;
		});

		function fetchFollowing(){
			return Seeder.prototype$getFollowing({
				id: $scope.currentUser.id
			}).$promise;
		}

	}
]);
