'use strict';

//This service represents the ServierSide Paging of Jquery datatable but this is not upkept
//with the logic and needs to be tested more thorughtly
//servers side has been added though
Application.shared.controller('ListServerPagingCtrl',['$scope','$location','$timeout','RestMaster','entDetails','$http','$compile',
                                   function($scope,$location,$timeout,RestMaster,entDetails,$http,$compile) {
    $scope.dtable = new Object(); //placeholder for the jquery datatable object
    $scope.options = {
        bProcessing: true,
        bServerSide: true,
        bJQueryUI  :  true,
        sAjaxSource: "/rest/candidates",
        sPaginationType: "full_numbers",
        iDisplayLength : 10 , //this would be the params.max value
        bInfo : true,
        bFilter: true,
        aoColumns: [
                {
                    "aTargets": [ "mycol1" ],
                    "mData":"id",
                    "mRender": function ( id, type, full )  {
                           return  '<span ><input type=\"checkbox\" ng-click=\"isChkBoxSelected('+ id +') \" ></span> ';
                    }
                 },
                 {
                    "mData":"name",
                    "aTargets": [ "mycol2" ],
                    "mRender": function ( name, type, full )  {
                        return  '<a href="'+name+'">' + name  + '</a>'
                    }

                 },
                 {
                    "mData":"id",
                    "aTargets": ["mycol3"],
                    "mRender": function ( id, type, full )  {
                           return '  <div class=\"supplierAction\"> \
                                     <a class=\"iconfa-eye-open\" ui-sref=\"Vendors.view({id:' + id +'})\" ></a> \
                                    <a class=\"iconfa-edit\" ui-sref=\"Vendors.edit({id:'+id + '})\"></a> \
                                    <a class=\"iconfa-trash\" ng-click=\"deleteRec(' +id + ')\" data-toggle=\"modal\"></a> \
                                    </div>';
                    }
                 }

         ],
         "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
          jQuery('td:eq(0)', nRow).addClass( "aligncenter" );
          jQuery('td:eq(1),td:eq(2),td:eq(3)', nRow).addClass( "avo-light" );

        },

        "oLanguage": {
          "sSearch": "Search all columns:"
        }
        //aoColumnDefs: [{
          // "bSortable": false,
            //"aTargets": [0, 1]
        //}],
        //bDestroy: true,
        //aaData: [{"class":"com.canarylogic.crm.Candidates","id":1,"name":"Johny 1"},{"class":"com.canarylogic.crm.Candidates","id":2,"name":"Johny 2"}],
        //aaSortingFixed: [[0,'asc']],
    };
    $scope.options.fnCreatedRow = function( nRow, aData, iDataIndex ) {
        $compile(nRow)($scope);
    }

    $scope.deleteRec = function(id){
        var r=confirm("Delete Record with ID-> " + id);
        $scope.statusMessage = ""
        if (r==true){
            RestMaster.delRowFromDataTable("candidates",id,$scope.dtable);
            $scope.statusMessage  = "Record Successfully Deleted" + id;
        }
    }
    //bulk delete logic
    // $scope.init = function(){
    //    $scope.isSelectAll = false;
    //    $scope.disabledel = true
    // }
     $scope.isChkBoxSelected = function(rowObj) {
       // alert("cehckbox select" + rowObj)
    }

    $scope.isListEmpty = function() {
        return $scope.disabledel;
    }

}]);

Application.shared.controller('BulkRecDeleteCtrl', ['$scope', 'RestMaster', 'model', function ($scope, RestMaster, model) {
    $scope.entDetails = model.entDetails;
    $scope.selectedItems = model.selectedItems
    $scope.submit = function (successFn) {
        console.log("entDetails" + $scope.entDetails.name + "selItems" + $scope.selectedItems);
        RestMaster.bulkDelete($scope.entDetails.name,$scope.selectedItems).$promise.then(function(){
              toastr.success('Delete Records Successfully.'); //TBD not working
              successFn();
        });

    };
}]);


Application.shared.controller('ListClientPagingCtrl',['$scope','$location','$timeout','RestMaster','entDetails','tableDataService','$http','$compile','createDialog', 'genericModules',
                                   function($scope,$location,$timeout,RestMaster,entDetails,tableDataService,$http,$compile,createDialog,genericModules) {
    $scope.selectedItems = []
    $scope.checkedRows = []
    $scope.options = tableDataService.getOTableOptions(entDetails.name);
    $scope.options.fnCreatedRow = function( nRow, aData, iDataIndex ) {
        $compile(nRow)($scope);
    }
    $scope.deleteRec = function(id){
        var r=confirm("Delete Record with ID-> " + id);
        $scope.statusMessage = ""
        if (r==true){
            RestMaster.delRecFromList(entDetails.name,id,$scope.options.aaData,1);
            $scope.statusMessage  = "Record Successfully Deleted" + id;
        }
    }
    //bulk delete logic
    $scope.init = function(){
       $scope.isSelectAll = false;
       $scope.disabledel = true
       $scope.options.aaData = RestMaster.listRecords(entDetails.name);
    }();

    $scope.isChkBoxSelected = function(id) {
       console.log("cehckbox select" + id)
       var isAdded = false
        for (var i in $scope.selectedItems) {
            var aId = $scope.selectedItems[i]
            if(aId == id){
              $scope.selectedItems.splice(i,1);
              isAdded = true
            }
        }
        if(!isAdded){
          $scope.selectedItems.push(id)
        }
        if(!$scope.isSelectAll) {
          if($scope.selectedItems.length > 0){
            $scope.disabledel = false
          }else{
            $scope.disabledel = true
          }
        }

        console.log("selected items list" + $scope.selectedItems + "and disabledel val is" + $scope.disabledel)
    }

    $scope.isListEmpty = function() {
        return $scope.disabledel;
    }

    $scope.bulkDelete = function(){
      var totalRec = $scope.selectedItems.length

      createDialog(genericModules.deleteDialog, {
            id: 'deleteVendorDialog',
            title: genericModules.deleteDialogTitle,
            backdrop: true,
            controller: 'BulkRecDeleteCtrl',
            success: {
                label: 'Delete ', fn: function () {
                    //$scope.billtos.splice(index, 1);
                    //updateHasBilltos();
                    console.log('delte needs to be worked on')
                //timeout to allow hibernate to flush records at backend

                   $timeout(function(){
                        $scope.options.aaData = RestMaster.listRecords(entDetails.name)
                        $scope.isSelectAll = false
                        $scope.processCheckAll()
                    }, 1000);
                    // $scope.statusMessage = "Records Deleted Successfully"

                }
            }
        }, {
            model: { "selectedItems" : $scope.selectedItems, "entDetails" : entDetails}
        });

    }
    $scope.$watch('searchText', function (val) {
        if (undefined == val)
            return
        //search only on the column one fo the list
        window.oTable.fnFilter(val,1)
    } );

    $scope.$watch("isSelectAll", function(newVal) {
       $scope.processCheckAll()
    });

    $scope.processCheckAll = function(){
      console.log("processCheckAll called")
        //var oSettings = window.oTable.fnSettings()
       //console.log(oSettings)
       //var len = oSettings._iDisplayLength

      jQuery.each($scope.options.aaData, function( index, value ) {
       // jQuery.each(window.oTable.fnSettings().aoData, function( index, value ) {
              console.log("value is"+ value.id)
              $scope.checkedRows[value.id] = $scope.isSelectAll
              $scope.selectedItems.push(value.id)
        })
        $scope.disabledel = !$scope.isSelectAll
        //add ids to the selectedItems based on selection
        if(!$scope.isSelectAll){
            $scope.selectedItems = []
        }
        console.log("Selected Checkbox " + $scope.selectedItems)
    }

}]);




