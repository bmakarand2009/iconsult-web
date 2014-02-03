Application.Security.controller('SecurityLoginCtrl', function ($scope,securityService,user) {
 	$scope.user = user || {};


  $scope.submit = function(successFn) {
    // var postData = { 
    //   "username": $scope.username, 
    //   "password": $scope.password 
    // }
    $scope.resp = securityService.signIn($scope.user)
    //Auth code is alwaysof 15 digits
    $scope.resp.$promise.then(function(data) {
            data.username = $scope.user.username
            successFn(data);
    });
  }
 	
});

Application.Security.controller('SecurityCtrl', function ($scope,securityService) {
  $scope.testUser={username:"testUser" ,password:"abc"}
	$scope.loginWithError = function () {
        	securityService.registerUser(this.testUser)
    };
  $scope.$on('event:auth-invalidlogin', function() {
       // alert("login invalid")
  });
 

});



