angular.module('lasius')
.factory('AuthService',[
  '$auth',
  '$q',
  'LoopBackAuth',
  'Seeder',
  function($auth, $q, LoopBackAuth, Seeder){
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
        var isAuthenticated = Seeder.isAuthenticated();
        var access_token = LoopBackAuth.accessTokenId;

        // We immediately delete the token wether or not the logout
        // request resolves
        LoopBackAuth.clearUser();
        LoopBackAuth.save();
        LoopBackAuth.clearStorage();

        // we put back the token so the logout request can be authorized
        LoopBackAuth.accessTokenId = access_token;

        // if the user is not authenticated we can't send a requestError
        // so we only empty the localstorage
        if(!isAuthenticated)
          return $q.resolve();

        return Seeder.logout()
        .$promise.then(function(){
          // We nullify the access token once the request has been resolved
          LoopBackAuth.accessTokenId = null;
        })
        .catch(function(err){
          // TODO report error to allow the server to destroy
          // the token when connectivity is back
        });
      }
    };
  }
]);
