// AddNewRecords.js

Application.vendors.controller('VendorAddController',['$scope','$stateParams','RestMaster','entDetails', 'sharedService','$cookieStore',
        function($scope,$stateParams, RestMaster,entDetails,sharedService,$cookieStore) {

        $scope.types
        $scope.vendor = {
            name :'' ,
            address :'',
            location: { street:'', address:''},
            contacts:[
        			{type:'email', value:''},
              {type:'work', value:'1(234) 555-1212'},
              {type:'cell', value:'1(234) 555-1212'},
            ],
            comments:''
        };

        $scope.addContact = function() {
          $scope.vendor.contacts.push({type:'', value:''});
        };

        $scope.removeContact = function(index) {
          $scope.vendor.contacts.splice(index, 1);
        };

        $scope.saveNewRecord = function(){
          alert("save record called" + entDetails.name)
          window.myent = entDetails.name
          var viewst = entDetails.name+"view"
          RestMaster.createRecord(entDetails.name,$scope.vendor,viewst)
        }

       $scope.autoFillLocation = function(val) {
          return sharedService.autoComplete(val).then(function(res){
            var addresses = [];
                angular.forEach(res.data, function(item){
                  addresses.push(item);
                });
                return addresses;
          });
        };



}]);



