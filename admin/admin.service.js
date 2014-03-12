Application.admin.factory('adminService',['$resource','$cookieStore', '$http','appConstants',
                    function ($resource,$cookieStore,$http,appConstants) {
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
        },
        jumpToContact : function(val){
            var baseurl = appConstants.baseUrl +'rest/jump?q='
            var authCode = $cookieStore.get('authCode')
            var url = baseurl+ val +"&token="+authCode;
            return $http.get(url)
        },
    }
}]);


