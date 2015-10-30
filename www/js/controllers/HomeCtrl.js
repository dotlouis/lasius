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

		Seeder.following({id:$scope.currentUser.id},{
			filter: {limit: 10}
		})
		.$promise.then(function(events){
			$scope.events = events;
		});

		$scope.createEvent = function(){
			Seeder.prototype$newEvent({id:$scope.currentUser.id},this.newEvent);
			$scope.createEventModal.hide();
		};

		$scope.follow = function(){
		};
	}
]);
