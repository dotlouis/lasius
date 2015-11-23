angular.module('lasius')
.directive('datepicker', [
  function(){
    return {
      restrict: 'E',
      templateUrl: 'app/datepicker/datepicker.template.html',
      scope: {
        firstDate: '=first',
        rruleString: '=rrule'
      },
      link: function(scope, element, attrs){
        scope.days = [
          { label: 'Monday', rule: RRule.MO },
          { label: 'Tuesday', rule: RRule.TU },
          { label: 'Wednesday', rule: RRule.WE },
          { label: 'Thursday', rule: RRule.TH },
          { label: 'Friday', rule: RRule.FR },
          { label: 'Saturday', rule: RRule.SA },
          { label: 'Sunday', rule: RRule.SU }
        ];

        scope.repetitions = [
          { label: 'once', rule: RRule.WEEKLY, count: 1},
          { label: 'week', rule: RRule.WEEKLY },
          { label: 'two weeks', rule: RRule.WEEKLY, interval: 2 },
          { label: 'month', rule: RRule.MONTHLY }
        ];

        // build the rule, each time the firstDate change
        // from inside or outside the directive
        scope.$watch('firstDate', function(){
          scope.buildRRule();
        });

        scope.generateStartingDates = function(){
          if(!scope.repetition || !scope.day)
            return;

          // we generate the next occurences for the user to choose
          scope.startingDates = [];
          new RRule({
            freq: RRule.WEEKLY,
            byweekday: scope.day.rule
          }).all(function(date, i){
            scope.startingDates.push({
              label: moment(date).calendar(null, {
                sameDay: '[Today]',
                nextDay: '[Tomorrow]',
                nextWeek: '[Next] dddd',
                lastDay: '[Yesterday]',
                lastWeek: '[Last] dddd',
                sameElse: 'll'
              }),
              date: date,
            });
            return i < 5;
          });

          // we set the starting date to the closest matching day
          scope.startingDate = scope.startingDates[0];
        };

        scope.setStartingDate = function(){
          if(!scope.startingDate)
            return;

          var setDate = moment(scope.startingDate.date);

          // We set the date only (we don't manipulate the time)
          scope.firstDate = moment(scope.firstDate)
            .year(setDate.year())
            .dayOfYear(setDate.dayOfYear())
            .toDate();
        };


        scope.buildRRule = function(){
          if(!scope.repetition || !scope.day || !scope.firstDate)
            return;

          // we create the recurrence rule
          scope.rrule = new RRule({
            freq: scope.repetition.rule,
            byweekday: scope.day.rule,
            interval: scope.repetition.interval || 1,
            dtstart: scope.firstDate
          });

          // we set the count if there is one
          if(scope.repetition.count)
            scope.rrule.origOptions.count = scope.repetition.count;

          // we set the scope variables
          scope.rruleString = scope.rrule.toString();
        };

      }
    };
  }
]);
