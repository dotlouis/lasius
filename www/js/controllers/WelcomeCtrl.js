angular.module('lasius')
.controller('WelcomeCtrl',[
    '$scope',
    '$ionicHistory',
    '$state',
    'AuthService',
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
