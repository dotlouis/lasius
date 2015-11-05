angular.module('lasius')
.directive('selectSheet',[
    '$parse',
    '$ionicActionSheet',
    function($parse, $ionicActionSheet){
        return{
            restrict: 'E',
            transclude: true,
            templateUrl: 'app/selectSheet/selectSheet.template.html',
            require: 'ngModel',
            scope:{
                chipItems: '=',
                chipName: '=',
                chipItemLabel: '='
            },
            link: function(scope, element, attrs, ngModel){

                scope.isEmpty = ngModel.$isEmpty();

                // if the model is populated or emptied
                // we reflect the changes
                scope.$watch(function(){
                    return ngModel.$modelValue;
                },function(newValue, oldValue){
                    scope.isEmpty = !(newValue);
                });

                scope.select = function(){
                    if(!scope.chipItems)
                        return;

                    var buttons = [];
                    // we set the actionsheet buttons to reflect each value
                    angular.forEach(scope.chipItems, function(item){
                      var text;
                      if(!scope.chipItemLabel)
                        text = item;
                      else
                        text = item[scope.chipItemLabel.itemProperty];

                        buttons.push({
                            text: text,
                            value: item
                        });
                    });

                    $ionicActionSheet.show({
                        buttons: buttons,
                        titleText: scope.chipName,
                        cancelText: 'Annuler',
                        cancel: function() {
                            // add cancel code..
                        },
                        buttonClicked: function(index){
                            ngModel.$setViewValue(buttons[index].value);
                            return true;
                        }
                    });
                };

                scope.deselect = function(){
                    ngModel.$setViewValue(undefined);
                };

            }
        };
    }
]);
