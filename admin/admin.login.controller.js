'use strict';
Application.admin.controller('LoginController', ['$scope','authService','adminService','$cookieStore','RestMaster','$rootScope',
				function ($scope, authService,adminService,$cookieStore,RestMaster,$rootScope) {

	$scope.init = function(){
		 var data ="login screen is on"
         $rootScope.$broadcast('event:auth-invalidlogin');
         //$scope.status = $cookieStore.get('status') //Display this error on the screen
         //alert($scope.status + "alert in login.js")
   	}();

    $scope.submit = function() {
		var postData = {
		  "username": $scope.username,
		  "password": $scope.password
		}
		$scope.resp = adminService.signIn(postData)
		//Auth code is alwaysof 15 digits
		$scope.resp.$promise.then(function(data) {
	     	  var myauth
	     	  for(var i=0;i<16;i++){
	     	  	if(typeof myauth == "undefined")
	     	  		myauth = data[i]
	     	  	else
	     	  		myauth=myauth+data[i]
	     	  }
	     	  console.log("authcode is here" + myauth)
	     	  RestMaster.updateAuthCode(myauth)

	     	  $cookieStore.put('authCode', myauth);
	     	  $cookieStore.put('username', $scope.username);
	     	  $cookieStore.put('status','')
	     	  authService.loginConfirmed();
	  	 });
	}


}]);
