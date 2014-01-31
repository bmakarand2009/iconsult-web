// variable sharing among controllers

myApp.factory('tableDataService', ['appConstants',function (appConstants) {

  var candOptions = {
        bProcessing: true,
        bJQueryUI  :  true,
        sPaginationType: "full_numbers",
        iDisplayLength : 5, //this would be the params.max value
       // bInfo : true,
        bFilter: true,
        aoColumns: [
                {
                    "aTargets": [ "mycol1" ],
                    "mData":"id",         
                    "mRender": function ( id, type, full )  {
                           return  '<span ><input type=\"checkbox\" ng-click=\"isChkBoxSelected('+ id +') \" ng-model=\"checkedRows['+id+']\" ></span> ';
                    }
                 },
                 {
                    "mData":"name",            
                    "aTargets": [ "mycol2" ],
                    "mRender": function ( name, type, full )  {
                        //return  '<a href="'+name+'">' + name  + '</a>'
                         return   '<a ui-sref=\"Vendors.view({id:'+full.id+ '})\"><h4>'+name+'</h4></a> \
                                   <p>'+name+'<span> commision</span></p> \
         						   <p>Company : {{user.commissionPercentage}} </p>'
                    }

                 },

                 // {
                 //    "mData":"id",            
                 //    "aTargets": ["mycol3"],
                 //    "mRender": function ( id, type, full )  {
                 //           return '  <div class=\"supplierAction\"> \
                 //                     <a class=\"iconfa-eye-open\" ui-sref=\"Vendors.view({id:' + id +'})\" ></a> \
                 //                    <a class=\"iconfa-edit\" ui-sref=\"Vendors.edit({id:'+id + '})\"></a> \
                 //                    <a class=\"iconfa-trash\" ng-click=\"deleteRec(' +id + ')\" data-toggle=\"modal\"></a> \
                 //                    </div>';  
                 //    }
                 // }

         ],
         "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
          jQuery('td:eq(0)', nRow).addClass( "aligncenter" );
          jQuery('td:eq(1),td:eq(2)', nRow).addClass( "avo-light" );
        },
        "oTableTools": {
          "sRowSelect": "multi",
          "aButtons": [ "select_all", "select_none" ]
        },
        aaData: [],
   }


  return { 
  	getOTableOptions: function(entName){
  		if(entName == appConstants.vendEntity){
  			return candOptions
  		}
  	}
  };


}]);


