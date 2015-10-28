angular.module('lasius')
.controller('HomeCtrl',[
	'$scope',
	'$ionicModal',
	'Seeder',
	function($scope, $ionicModal, Seeder){

		$scope.newEvent = {};

		$ionicModal.fromTemplateUrl('templates/createEventModal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.createEventModal = modal;
		});

		Seeder.events({
			id: $scope.currentUser.id,
			filter: {
				limit: 10
			}
		})
		.$promise.then(function(events){
			$scope.events = events;
		});

		$scope.createEvent = function(){
			Seeder.events.create({
				id: $scope.currentUser.id
			}, this.newEvent)
			.$promise.then(function(plop){
				console.log(plop);
			});
			$scope.createEventModal.hide();
		};
	}
]);
