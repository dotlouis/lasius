angular.module('lasius')
.controller('welcome.controller',[
    '$scope',
    '$ionicHistory',
    '$state',
    'auth.service',
    function($scope, $ionicHistory, $state, Auth){

        $scope.loginWith = function(provider){
            Auth.loginWith(provider)
            .then(function(){
                $ionicHistory.nextViewOptions({
                    disableBack: false,
                    historyRoot: true
                });
                $state.go('app.home');
            });
        };
}]);
