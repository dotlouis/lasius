angular.module('lasius')
.controller('HomeCtrl',[
	'$scope',
	'$ionicModal',
	'RequestManager',
	'Seeder',
	function($scope, $ionicModal, ReqM, Seeder){

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
			var self = this;
			var plop;
			if(self.event.unfollowed){
				self.event.unfollowed = false;
				ReqM.bundleAs('follow', function(){
					Seeder.prototype$follow({
						id:$scope.currentUser.id,
						eventId: self.event.id
					});
				});
			}
			else{
				self.event.unfollowed = true;
				ReqM.bundleAs('follow', function(){
					Seeder.prototype$unfollow({
						id:$scope.currentUser.id,
						eventId: self.event.id
					});
				});
			}
		};

		$scope.getFollowing();
	}
]);
