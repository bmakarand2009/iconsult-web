/**
* This directive will find itself inside HTML as a class,
* and will remove that class, so CSS will remove loading image and show app content.
* It is also responsible for showing/hiding login form.
*/
Application.Security.directive('securityAuthHandler',  function(showDialog,securityDialogs,$state,routerStates) {
    return {
      restrict: 'C',
      link: function(scope, elem, attrs) {
        //once Angular is started, remove class:
        elem.removeClass('waiting-for-angular');
                
        scope.$on('event:auth-loginRequired', function() {    
            if($state.current.name === routerStates.home){
               alert("Invalid Login Credentials!! Please try again")
            }else{
              showDialog(securityDialogs.loginDialog(), { 
               user:{} 
              }); 
            }        
        });
        scope.$on('event:auth-loginConfirmed', function() {
          //add the header for authorization
          
        });
      }
    }
});