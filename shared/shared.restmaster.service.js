/******** start of sevices.js******/
myApp.factory('RestMaster',['$resource','$location','$state','$timeout','$cookieStore','appConstants',
                            function($resource,$location,$state,$timeout,$cookieStore,appConstants) {
    // return $resource('/FACTURA-T/suppliers/saveSupplier/:id');
    var authCode = 'uninit'
    var getAuthToken = function(){
         authCode = $cookieStore.get('authCode');
    }();
    var getResource = function(){
        var url = appConstants.baseUrl + 'rest/:entityName/:id?token=:token';
        return $resource( url,
            {
                entityName:'@entityName',
                id:'@id.clean',
                token:'@token'
            },
            {
                update :{
                    method : 'PUT'
                }
            }
        );
    }

    return{
        
        updateAuthCode : function(aCode){
            authCode = aCode
        },
        createRecord : function(aEntity,record,viewState){
          return getResource().save({entityName:aEntity,token:authCode},record,function(response){
                //$location.path(viewUrl);
                $state.go(viewState)
          },function(response) {
                throw "Exception Occured in createRecord() ::" + response.error + response.status
          });
        },
        updateRecord : function(aEntity,aId,curRec,viewState){
            return getResource().update({ entityName:aEntity,id:aId,token:authCode,curEntity:curRec},function(response){
                //$location.path(viewUrl+aId);
                $state.go(viewState)
            });
        },
        getRecord : function(aEntity, aId){
            return getResource().get({entityName:aEntity,id :aId,token:authCode})
        },
        listRecords : function(aEntity) {
            console.log("alert calling listrecords"+ authCode)
            return getResource().query({entityName:aEntity,token:authCode});
        },
        delRecFromList : function(aEntity,aId,records,index){
            return getResource().remove({ids :aId,entityName:aEntity,token:authCode },function(response){
                if(index >0)
                    records.splice(index,1);
            });
        },
        delRecord : function(aEntity,aId,listState){
            return getResource().remove({entityName:aEntity,ids:aId,token:authCode},function(response){
                //$location.path(listUrl);
                $state.go(listState);
             },function(response) {
                throw "Exception Occured in delete()" +  response.status
            });
        },
        bulkDelete : function(aEntity,selectedItems){
            var selIds = selectedItems.join(',');
            return getResource().remove({entityName:aEntity,ids:selIds,token:authCode});
        },
        delRowFromDataTable : function(aEntity,aId,dtable){
            return getResource().remove({ids :aId,entityName:aEntity ,token:authCode},function(response){
                $timeout(function(){ dtable.fnClearTable() }, 300);    
            });
        }


    }

}]);
/****end of services.js ************/