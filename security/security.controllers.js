Application.Security.controller('SecurityLoginCtrl', function ($scope,$rootScope,$state,$cookieStore,securityService,authService,RestMaster,routerStates) {
 	$scope.user =  {};


  $scope.init = function(){
    var data ="login screen is on"

    if($state.current.name === 'home'){
          //check if user is already logged in
          var aCode = $cookieStore.get('authCode');
          if(aCode.length >13){
            $state.go(routerStates.Candidates)
          }else{
            $scope.user.username = $cookieStore.get('username'); 
            $rootScope.$broadcast('event:auth-invalidlogin');
          }
    }

  }();

  $scope.submit = function(successFn) {
    $scope.resp = securityService.signIn($scope.user)
    //Auth code is alwaysof 15 digits
    $scope.resp.$promise.then(function(data) {
        data.username = $scope.user.username
        var myauth 
        //calculate authcode
        for(var i=0;i<16;i++){
          if(typeof myauth == "undefined")
            myauth = data[i]
          else
            myauth=myauth+data[i]
        }
        RestMaster.updateAuthCode(myauth)
        $cookieStore.put('authCode', myauth); 
        $cookieStore.put('username', data.username); 
        $cookieStore.put('status','')
        if(typeof successFn!== 'undefined' )
          successFn(data);
        else
          $state.go(routerStates.Candidates)

        authService.loginConfirmed();

    });
  }
	
});

Application.Security.controller('SecurityCtrl', function ($scope,$state,securityService,routerStates,$cookieStore) {
  
  $scope.logout = function() {
    $scope.resp =securityService.signOut();

    $scope.resp.$promise.then(function(data) {
        $cookieStore.put('authCode', ''); 
        $cookieStore.put('username', ''); 
        $cookieStore.put('status','Enter your credentials')
        console.log("user logged out")
        $scope.isLoggedIn = false
        $state.go(routerStates.home)
    })
  }
});






