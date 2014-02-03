/*******START OF parentviewcontroller.js*******/

'use strict';

myApp.controller('ParentViewController',['$scope','$cookieStore','$state','adminService','securityService', 
    function($scope,$cookieStore,$state,adminService,securityService) {
   
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
