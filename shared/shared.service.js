
Application.shared.factory('sharedService',['$cookieStore', '$http','appConstants',
	function ($cookieStore,$http,appConstants) {

	return {
		autoComplete : function(val){
		      var baseurl = appConstants.baseUrl +"geo/findByCityOrZip?q="
		      var authCode = $cookieStore.get('authCode')
		      var url = baseurl+ val +"&token="+authCode;
		      return $http.get(url)
    	},
	}
}]);
