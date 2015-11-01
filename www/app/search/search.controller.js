angular.module('lasius')
.controller('search.controller',[
	'$scope',
	'$ionicModal',
	'delayer.service',
	'Seeder',
	function($scope, $ionicModal, Delayer, Seeder){

    $scope.inputs = {
      query:''
    };

    $scope.search = new Delayer([search],{
      delay: 200,
      block: false
    });

    function search(){
      console.log($scope.inputs.query);
    }
	}
]);
