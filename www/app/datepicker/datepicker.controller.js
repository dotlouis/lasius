angular.module('lasius')
.controller('datepicker.controller', [
  '$scope',
  '$filter',
  function($scope, $filter){

    $scope.days = [
      { label: 'Monday', rule: RRule.MO },
      { label: 'Tuesday', rule: RRule.TU },
      { label: 'Wednesday', rule: RRule.WE },
      { label: 'Thursday', rule: RRule.TH },
      { label: 'Friday', rule: RRule.FR },
      { label: 'Saturday', rule: RRule.SA },
      { label: 'Sunday', rule: RRule.SU }
    ];

    $scope.repetitions = [
      { label: 'once', rule: RRule.WEEKLY, count: 1},
      { label: 'week', rule: RRule.WEEKLY },
      { label: 'two weeks', rule: RRule.WEEKLY, interval: 2 },
      { label: 'month', rule: RRule.MONTHLY }
    ];

    $scope.buildRRule = function(params){
      if(!$scope.repetition || !$scope.day)
        return;

      // we create the recurrence rule
      $scope.rrule = new RRule({
        freq: $scope.repetition.rule,
        byweekday: $scope.day.rule,
        interval: $scope.repetition.interval || 1
      });

      // we generate the next occurences for the user to choose
      $scope.startingDates = [];
      new RRule({
        freq: RRule.WEEKLY,
        byweekday: $scope.day.rule
      }).all(function(date, i){
        $scope.startingDates.push({
          label: moment(date).calendar(null, {
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: '[Next] dddd',
            lastDay: '[Yesterday]',
            lastWeek: '[Last] dddd'
          }),
          date: date,
        });
        return i < 5;
      });

      if(params && params.resetStarting)
        $scope.startingDate = $scope.startingDates[0];

      // we set the starting date if there is one
      if($scope.startingDate)
        $scope.rrule.origOptions.dtstart = moment($scope.startingDate.date).startOf('day').toDate();

      // we generate the text rule before the count to skip the ("for x times")
      $scope.rruleText = $scope.rrule.toText();
      $scope.rrule.origOptions.count = $scope.repetition.count || 10;
    };

  }
]);
