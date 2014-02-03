
Application.Shared.factory('sharedService',['$cookieStore', '$http','appConstants',
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


Application.Shared.factory('showDialog', function(createDialog, toastr) {
    var genBtnLabel = function(config){
        var btnlbl;
        if (typeof config.btnLbl != 'undefined') {
            btnlbl = config.btnLbl;
        }
        else
        {
            btnlbl = config.name + ' ' + config.module;
        }
        if (typeof config.btnPrefix != 'undefined') {
            btnlbl =  config.btnPrefix + ' ' + btnlbl
        }     
        return btnlbl
    };
   
    return function (config, parameters) {
        createDialog(config.templateUrl, {
            id: config.name,
            title: config.name + ' ' + config.module,
            backdrop: true,
            controller: config.controller,
            success: {
                label: genBtnLabel(config),
                fn: function(data) {
                    //toastr.success(config.message);
                    config.successFn(data);
                }
            }
        }, parameters);
    };
});


