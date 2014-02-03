Application.Security.service('securityDialogs', function ($http, $rootScope,authService,$cookieStore,RestMaster,$state) {
   var self = this;

    /*Data
     "access_token":"boQtj0SCGz2GFGz[...]",
    "token_type":"bearer",
    "expires_in":1209599,
    "userName":"Alice",
    ".issued":"Mon, 14 Oct 2013 06:53:32 GMT",
    ".expires":"Mon, 28 Oct 2013 06:53:32 GMT"
    */
	this.loginSuccess = function (data) {
      //reload the current state
      $state.go('.', {q: "TT"} , {reload: true});
  };

	return {
        loginDialog: function(){
            return {
                name: "Login",
                module: "User",
                templateUrl: 'security/security.loginDialog.html',
                controller: 'SecurityLoginCtrl',
                message: 'User successfully logged in',
                successFn: function (data) {
                     self.loginSuccess(data);
                }

            }
        },
    };
});


Application.Security.factory('securityService',['$resource','$http','appConstants','$cookieStore',
                    function ($resource,$http,appConstants,$cookieStore) {
    return{
        signIn : function(data){
            return $resource(appConstants.baseUrl + 'rest/auth').get(data);
        },
        signOut : function(){
            var username = $cookieStore.get('username')
            var params = { 
               "username":username
            }
           return $resource(appConstants.baseUrl +'auth/logout').get(params);
        }
    }
}]);



