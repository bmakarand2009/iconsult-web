myApp.directive('ngSparkline', function() {
  return {
    restrict: 'A',
    require: '^ngCity',
    scope: {
      ngCity: '@'
    },
    template: '<h4>Weather for city {{ngCity}}</h4>'
  }
});

myApp.directive('ngListheader', [function() {
  return {
    restrict: 'EA',
    require: '^ngEntity',
    scope:{
      ngEntity : '@',
      isListEmpty : '&',
      bulkDelete: '&',
      searchText :'@'
    },
    templateUrl: 'shared/list.header.html',
    controller: function($scope) {
     

       $scope.filterView = function(links){
         if (links == 1){
            document.getElementById('text').style.display = 'none';
            document.getElementById('newselect').style.display = 'block';
            document.getElementById('click').style.display = 'none';  
            document.getElementById('click1').style.display = 'block';    
        }
        else if (links == 2) {
            document.getElementById('text').style.display = 'block';
            document.getElementById('newselect').style.display = 'none';
            document.getElementById('click').style.display = 'block';
            document.getElementById('click1').style.display = 'none';
          }
       }
     }
  }
}]);
myApp.directive('ngDeleteItemFromList', function() {
  return {
    restrict: 'EA',
    templateUrl: 'shared/deleteModalDialogForList.html',
    require: '^ngEntity',
    scope: {
       ngEntity : '@',
       bulkDelete: '&',
       cancel:'&'
    }
  }
});

myApp.directive('ngSparkstatus', function($parse) {
  return {
    restrict: 'A',
    require: '^ngModel',
    scope: {
      model: '=ngModel'
    },
    template: '<span id="hstatus">{{model}}</span>',
    link: function(scope, iElement, iAttrs) {
      scope.$watch("model", function(newVal) {
        jQuery("#hstatus").show();
        jQuery("#hstatus").delay(5000).fadeOut(300);
      });
    }
  }
});






myApp.directive('myTable', function () {  
    return {
        restrict: 'E, A, C',
        controller:function ($scope, $attrs) {
            $scope.dtable = new Object();
        },

        link: function (scope, element, attrs, controller) {
           var dataTable = element.dataTable(scope.options);
           window.oTable = dataTable
           scope.dtable = dataTable;
           scope.$watch('options.aaData', handleModelUpdates, true);
            function handleModelUpdates(newData) {
                var data = newData || null;
                if (data) {
                    dataTable.fnClearTable();
                    dataTable.fnAddData(data); 
                }
            }
        },
        scope: {
            options: "=",
            dtable: "="
        }
    };
});


myApp.directive('autoComplete',['$timeout', '$cookieStore', '$http',function($timeout,$cookieStore,$http) {
    return {
          scope: {
              term:'@',
              urltype:'@' //urltype valid values are nothing, address(for autocomplete address)
          },
          link:function(scope, iElement, iAttrs) {

            iElement.autocomplete({
                      minLength: 1,
                      delay: 500,
                    //source: scope[iAttrs.uiItems],
                source:function(request, response) {
                    var authCode = $cookieStore.get('authCode')
                   // window.myatts = iAttrs
                   //  window.myrequest = request
                   //  window.myresponse = response
                   //  window.myelemenet = iElement
                   //  window.myscope = scope
                    var baseurl ="/rest/jump?q="
                    if(scope.urltype == "address"){
                      baseurl = "/geo/findByCityOrZip?q="
                    }
                    var url = baseurl+ request.term +"&token="+authCode;
                    $http.get(url).success( function(data) {
                        response(data);
                    });
                },
                select: function(event,ui) {
                    $timeout(function() {
                      iElement.trigger('input');
                      console.log("ui item is"+ ui.item)
                      window.mysel = ui.item
                    }, 0);
                } 
            }).data("autocomplete")._renderItem = function (ul, item) {
                return jQuery("<li></li>")
                    //.data("item.autocomplete", item)
                    .append("<a>" + item.label + "</a>")
                    .appendTo(ul);
            };
        }
    }
}]);





