angular.module('lasius')
.controller('home.controller',[
	'$scope',
	'delayer.service',
	'Seeder',
	function($scope, Delayer, Seeder){

		$scope.fetchFollowing = new Delayer([fetchFollowing]);

		$scope.$on('$ionicView.beforeEnter', function(){
			fetchFollowing();
		});

		function fetchFollowing(){
			var res = Seeder.prototype$getFollowing({
				id: $scope.currentUser.id
			});
			res.$promise.then(function(cacheFollowing){
				// console.log(cacheFollowing);
				$scope.events = cacheFollowing.events;
			})
			.catch(function(cacheErr){
				// console.log(cacheErr);
			});
			return res.$httpPromise.then(function(following){
				// console.log(following);
				$scope.events = following.events;
			})
			.catch(function(err){
				// console.log(err);
			});
		}

	}
]);
