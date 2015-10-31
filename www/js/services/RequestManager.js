angular.module('lasius')
.factory('RequestManager',[
  '$timeout',
  function($timeout){
  var bundles = {};
  var DELAY = 3000;
  return {

    // Used to "bundle" several calls under a same identifier (bundleKey)
    // for example you don't want to send a network request each time the user
    // spams a button (users are weird sometimes)
    // Group each related call under the same bundle key and they will automatically
    // cancel each other if under a certain period (delay)
    // that way only the last call will be executed.
    bundleAs: function(bundleKey, bundleFn, delay){
        delay = delay || DELAY;

        if(bundles[bundleKey] && bundles[bundleKey].timeout)
          $timeout.cancel(bundles[bundleKey].timeout);

        bundles[bundleKey] = {
          timeout: $timeout(function(){
            // remove the bundle key once the call has ended
            delete bundles[bundleKey];
            return bundleFn();
          }, delay)
        };
        return bundles[bundleKey].timeout;
    }
  };
}]);
