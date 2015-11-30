angular.module('lasius')
.factory('auth.service',[
  '$auth',
  '$q',
  '$cachedResource',
  'LoopBackAuth',
  'Seeder',
  function($auth, $q, $cachedResource, LoopBackAuth, Seeder){
    return {
      loginWith: function(provider){
        return $auth.authenticate(provider)
        .then(function(accessToken){
          LoopBackAuth.setUser(
            accessToken.data.id,
            accessToken.data.userId,
            accessToken.data.user
          );
          LoopBackAuth.rememberMe = true;
          LoopBackAuth.save();
        })
        .catch(function(err){
          // TODO: report error
        });
      },
      logout: function(){
        var logoutRequest;

        if(Seeder.isAuthenticated())
          logoutRequest = Seeder.logout().$promise;
        else
          logoutRequest = $q.resolve();

        return logoutRequest.finally(function(){

          LoopBackAuth.clearUser();
          LoopBackAuth.save();
          LoopBackAuth.clearStorage();
          $cachedResource.clearCache({clearPendingWrites: true});

          // TODO report error to allow the server to destroy
          // the token when connectivity is back
        });
      }
    };
  }
]);
