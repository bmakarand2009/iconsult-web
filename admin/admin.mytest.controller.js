
'use strict';

myApp.controller('MyTestController',['$scope','$cookieStore','$state','signOutService','$http', 'createDialog', 'genericModules',
	function($scope,$cookieStore,$state,signOutService,$http,createDialog,genericModules) {
   
    $scope.isLoggedIn = true;

    $scope.parentTest = "hello khushi, how do u do i am fine how 'bout you? ";
    $scope.selected = undefined;
    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
  


    $scope.awesomeFunc = function() {
    	toastr.options.closeButton = true;
        toastr.success("Did you see Khushi's Awesomeness");
    };

    $scope.getLocation = function(val) {	
	    return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
	      params: {
	        address: val,
	        sensor: false
	      }
	    }).then(function(res){
	      var addresses = [];
	      angular.forEach(res.data.results, function(item){
	        addresses.push(item.formatted_address);
	      });
	      window.myaddr2 = addresses;
	      return addresses;
	    });
  	};

 	$scope.autoFillLocation = function(val) {	
        var baseurl ="/geo/findByCityOrZip?q="
    	var authCode = $cookieStore.get('authCode')
        var url = baseurl+ val +"&token="+authCode;
        return $http.get(url).then( function(res) {
			var addresses = [];
	      	angular.forEach(res.data, function(item){
	        	addresses.push(item);
	      	});
	      	return addresses;
        });
	
	   
  	};

  	$scope.launchDateDialog = function(){
  		createDialog(genericModules.dateDialog, {
            id: 'testDateDialog',
            title: genericModules.deleteDialogTitle,
            backdrop: true,
            controller: 'DialogTestCtrl',
            success: {
                label: 'Submit ', fn: function () {
                	  toastr.success('Dialog Records Successful.'); //TBD not working

                }
            }
        }, {
            model: { "selectedItems" : "test"}
        });
  	};



  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.showWeeks = true;
  $scope.toggleWeeks = function () {
    $scope.showWeeks = ! $scope.showWeeks;
  };

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = ( $scope.minDate ) ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    'year-format': "'yy'",
    'starting-day': 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
  $scope.format = $scope.formats[0];

}]);






myApp.controller('DialogTestCtrl',['$scope','model', function($scope,model) {
	$scope.simpleVar = "test passed";
    $scope.submit = function (successFn) {
        successFn();
    };

	$scope.today = function() {
    	$scope.dt = new Date();
	  };
	  $scope.today();

	  $scope.showWeeks = true;
	  $scope.toggleWeeks = function () {
	    $scope.showWeeks = ! $scope.showWeeks;
	  };

	  $scope.clear = function () {
	    $scope.dt = null;
	  };

	  // Disable weekend selection
	  $scope.disabled = function(date, mode) {
	    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	  };

	  $scope.toggleMin = function() {
	    $scope.minDate = ( $scope.minDate ) ? null : new Date();
	  };
	  $scope.toggleMin();

	  $scope.open = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.opened = true;
	  };

	  $scope.dateOptions = {
	    'year-format': "'yy'",
	    'starting-day': 1
	  };

	  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
	  $scope.format = $scope.formats[0];

}]);

