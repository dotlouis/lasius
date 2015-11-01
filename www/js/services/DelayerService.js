angular.module('lasius')
.factory('DelayerService',[
  '$timeout',
  '$q',
  function($timeout, $q){

  var Delayer = function(fns, options){
    if(!fns || fns.length<1 || typeof fns[0]!== 'function')
      throw "needs an array of at least one function";

    if(!options)
      options = {};

    this.delay = typeof options.delay !== 'undefined' ? options.delay : 3000;
    this.fns = fns;
    this.current = 0;
    this.hits = 0;
  };

  Delayer.prototype.toggle = function(params){
    var self = this;

    // We modulo the current index to allow looping
    this.current = this.current%this.fns.length;

    // this is just to help the user know which function is beeing called
    this.currentFn = this.fns[this.current].name;

    this.result = $q.defer();

    // if mutliple functions (toggle with 2 or more positions)
    // we wait for the position to be considered "stable" before calling the
    // associated function
    if(this.fns.length > 1){

      // if there is a timeout function running, we cancel it
      if(this.timeout && this.timeout.$$state.status === 0)
        $timeout.cancel(this.timeout);

      // but we don't call the function if the "stablized" function is the same
      // as the one we started at
      if((this.hits > 0) && (this.hits%this.fns.length === this.current)){
        this.hits = 0;
      }
      else{
        (function(current){
          self.timeout = $timeout(function(){
            self.hits = 0;
            // we resolve the result once the delay is passed
            self.result.resolve(self.fns[current](params));
          },self.delay);
        })(this.current);
        this.hits++;
      }
      this.current++;
    }

    // if there is only one function (ie: refresh button)
    // we execute immediatly then block further calls until the delay is over
    else{
      // if there is a timeout function running, we don't do anything
      if(!(this.timeout && this.timeout.$$state.status === 0)){
        this.result.resolve(this.fns[this.current](params));
        this.timeout = $timeout(this.delay);
      }
    }

    return this.result.promise;
  };

  return Delayer;

}]);
