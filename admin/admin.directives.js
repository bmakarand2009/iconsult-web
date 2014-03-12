Application.admin.directive('ngSparkline', function() {
  return {
    restrict: 'A',
    require: '^ngCity',
    scope: {
      ngCity: '@'
    },
    template: '<h4>Weather for city {{ngCity}}</h4>'
  }
});

Application.admin.directive('ngSparkstatus', function($parse) {
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


Application.admin.directive('ngListheader', [function() {
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


/**
* This directive will find itself inside HTML as a class,
* and will remove that class, so CSS will remove loading image and show app content.
* It is also responsible for showing/hiding login form.
*/
Application.admin.directive('authDemoApplication', ['$state','$cookieStore' , function($state,$cookieStore) {
    return {
      restrict: 'C',
      link: function(scope, elem, attrs) {
        //once Angular is started, remove class:
        elem.removeClass('waiting-for-angular');

        //var login = elem.find('#login-holder');
        //var main = elem.find('#content');
        //login.hide();
        scope.$on('event:auth-loginRequired', function() {
            if(  $state.current.name == 'login'){
              alert("Invalid Credentials , Login again")
              $cookieStore.put('status','Invalid Credentials, Login Again')
            }else{
              alert("Enter User Credentials ")
              $cookieStore.put('status','Enter Credentials')
            }
            $state.go('login')
        });
        scope.$on('event:auth-loginConfirmed', function() {
          // main.show();
          // login.slideUp();
             $state.go('Candidates.list')

        });
      }
    }
  }]);