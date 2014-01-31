/*******START OF parentviewcontroller.js*******/

'use strict';

myApp.controller('ParentViewController',['$scope','$cookieStore','$state','adminService','$http', 
    function($scope,$cookieStore,$state,adminService,$http) {
   
    $scope.isLoggedIn = true

    $scope.$on('event:auth-invalidlogin', function() {
        $scope.isLoggedIn = false
    });
    $scope.$on('event:auth-loginConfirmed', function() {
        $scope.isLoggedIn = true
    });

    $scope.isValidUser = function() {
    	return $scope.isLoggedIn;
    }

    $scope.logout = function() {
        $scope.resp =adminService.signOut();

        $scope.resp.$promise.then(function(data) {
            $cookieStore.put('authCode', ''); 
            $cookieStore.put('username', ''); 
            $cookieStore.put('status','Enter your credentials')
            console.log("user logged out")
            $scope.isLoggedIn = false
            $state.go('login')
        })

    }

    $scope.autoFillJump = function(val) {   
        return adminService.jumpToContact(val).then(function(res){
            var addresses = [];
            angular.forEach(res.data, function(item){
                addresses.push(item.label);
            });
            return addresses;
        });
    };

}]);

/*******END OF parentviewcontroller.js*******/
