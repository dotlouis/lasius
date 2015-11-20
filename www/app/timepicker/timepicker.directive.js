angular.module('lasius')
.directive('timepicker', [
  function(){
    return {
      restrict: 'E',
      templateUrl: 'app/timepicker/timepicker.template.html',
      scope: {
        startInput: '=start',
        endInput: '=end'
      },
      link: function(scope, element, attrs){

        var startTime;
        var endTime;

        scope.buildTime = function(params){

          // if time not defined, we set it to now
          if(!scope.startInput)
            startTime = moment(new Date()).startOf('hour');
          else
            startTime = moment(scope.startInput);

          if(!scope.endInput)
            endTime = moment(startTime);
          else
            endTime = moment(scope.endInput);

          // if the end-time is the same or less than the start-time
          // we update the corresponding time to match
          if(endTime.isSame(startTime) || endTime.isBefore(startTime)){
            if(params && params.from === 'start'){
              // if we go the next day, we stay just before it.
              if(moment(startTime).add(1, 'hours').startOf('day').isSame(moment(startTime).add(1,'day').startOf('day')))
                endTime.endOf('day').startOf('minute');
              else
                endTime = moment(startTime).add(1, 'hours');
            }
            else if(params && params.from === 'end'){
              if(moment(endTime).subtract(1, 'hours').startOf('day').isSame(moment(endTime).subtract(1,'day').startOf('day')))
                startTime.startOf('day');
              else
                startTime = moment(startTime).subtract(1, 'hours');

              // console.log(startTime.subtract(1,'hours').hours());
            }
          }

          // we set back the inputs to the calculated time
          scope.startInput = startTime.toDate();
          scope.endInput = endTime.toDate();
        };

        scope.buildTime({from:'start'});

      }
    };
  }
]);
