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

		$scope.getFollowing = function(){
			Seeder.prototype$getFollowing({id:$scope.currentUser.id})
			.$promise.then(function(following){
				$scope.events = following.events;
			});
		};

		$scope.createEvent = function(){
			Seeder.prototype$newEvent({id:$scope.currentUser.id},this.newEvent);
			$scope.createEventModal.hide();
		};

		$scope.toggleFollow = function(){
			console.log(this.event);
			if(this.event.unfollowed){
				this.event.unfollowed = false;
				Seeder.prototype$follow({id:$scope.currentUser.id, eventId: this.event.id});
			}
			else{
				this.event.unfollowed = true;
				Seeder.prototype$unfollow({id:$scope.currentUser.id, eventId: this.event.id});
			}
		};

		$scope.getFollowing();
	}
]);
