'use strict';
/* LIST SUPPLIERS PAGE */
myApp.controller('RecListController',['$scope','$location','$timeout','RestMaster','entDetails',
                                   function($scope,$location,$timeout,RestMaster,entDetails) {
   $scope.init = function(){
       $scope.isSelectAll = false;
       $scope.disabledel = true
       $scope.records = RestMaster.listRecords(entDetails.name);
   }();
   
    $scope.deleteRec = function(curRecord,index){
        var r=confirm("Delete Record with ID-> " + curRecord.id);
        $scope.statusMessage = ""
        if (r==true){
            RestMaster.delRecFromList(entDetails.name,curRecord.id,$scope.records,index);
            $scope.statusMessage  = "Record Successfully Deleted" + curRecord.id;
        }
    }
    $scope.cancelDialog = function() {
        $location.path("/"+entDetails.name.toLowerCase());
        $location.replace();
    }
    $scope.bulkDelete = function(){
        var selectedItems = [];
        var selIdx = []
        for (var i in $scope.records) {
            var aRecord = $scope.records[i]
            if(aRecord.selected){
                selectedItems.push(aRecord.id)
            }
        }
         if(selectedItems.length > 0){
              //var listState = entDetails.name.charAt(0).toUpperCase() + entDetails.name.slice(1);
              RestMaster.bulkDelete(entDetails.name,selectedItems,$scope.records);
              //timeout to allow hibernate to flush records at backend
              $timeout(function(){$scope.records = RestMaster.listRecords(entDetails.name)}, 1000);    
              $scope.statusMessage = "Records Deleted Successfully"   
         }
    }

    $scope.$watch("isSelectAll", function(newVal) {
       for (var i in $scope.records) {
            $scope.records[i].selected = $scope.isSelectAll
        }
        $scope.disabledel = !$scope.isSelectAll
    });

    $scope.isChkBoxSelected = function(isSel) {
        if($scope.isSelectAll) return
        $scope.disabledel = isSel
    }

    $scope.isListEmpty = function() {
        return $scope.disabledel;
    }

}])


/*   VIEW CONTROLLER */
myApp.controller('RecViewController',['$scope','$stateParams','RestMaster','entDetails', 
        function($scope,$stateParams, RestMaster,entDetails) {   
        $scope.record;
    	if (!$scope.record) {
            $scope.record = RestMaster.getRecord(entDetails.name,$stateParams.id);
        } 
        $scope.viewRecord = function(){
            alert("ViewRecord callled for" + entDetails.name + $stateParams.id);
            $scope.record = RestMaster.getRecord(entDetails.name,$stateParams.id);
        }
    	$scope.save=function(){
            //var viewUrl = "/view_supplier/";
            var viewState = entDetails.name+".view";
            $scope.status = RestMaster.updateRecord(entDetails.name,$stateParams.id,$scope.record,viewState);
    		
    	};	
        $scope.delete = function() {
            var listState = entDetails.name;
            $scope.status = RestMaster.delRecord(entDetails.name,$scope.record.id,listState)
        }
    	
}]);

 




	
	


