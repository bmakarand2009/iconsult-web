Application.admin.directive('myTable', function () {
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



Application.admin.directive('autoComplete',['$timeout', '$cookieStore', '$http',function($timeout,$cookieStore,$http) {
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





