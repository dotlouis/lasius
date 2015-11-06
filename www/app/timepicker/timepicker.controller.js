angular.module('lasius')
.controller('timepicker.controller', [
  '$scope',
  function($scope){

    $scope.startTime = moment(new Date()).startOf('hour');
    $scope.endTime = moment($scope.startTime).add(1,'hours');

    $scope.inputs = {
      startTime: $scope.startTime.toDate(),
      endTime: $scope.endTime.toDate()
    };

    $scope.buildTime = function(params){

      // if time not defined, we set it to now
      if(!$scope.inputs.startTime)
        $scope.startTime = moment(new Date()).startOf('hour');
      else
        $scope.startTime = moment($scope.inputs.startTime);

      if(!$scope.inputs.endTime)
        $scope.endTime = moment($scope.startTime).add(1,'hours');
      else
        $scope.endTime = moment($scope.inputs.endTime);


      // if the end-time is the same of less than the start-time
      // we update the corresponding time to match
      if($scope.endTime.isSame($scope.startTime) || $scope.endTime.isBefore($scope.startTime)){
        if(params && params.from === 'start')
          $scope.endTime.add(1, 'hours').toDate();
        else if(params && params.from === 'end')
          $scope.startTime.subtract(1, 'hours').toDate();
      }

      // we set back the inputs to the calculated time
      $scope.inputs.startTime = $scope.startTime.toDate();
      $scope.inputs.endTime = $scope.endTime.toDate();

    };

  }
]);
