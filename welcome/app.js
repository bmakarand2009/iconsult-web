/*******START OF app.js*******/
// Make sure to include the `ui.router` module as a dependency
var myApp = angular.module('myApp', ['ngResource','ui.router','http-auth-interceptor','ngCookies','ngRoute','iconsult.shared'])
    .run(
    [        '$rootScope', '$state', '$stateParams',
        function ($rootScope,   $state,   $stateParams) {

            // It's very handy to add references to $state and $stateParams to the $rootScope
            // so that you can access them from any scope within your applications.For example,
            // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
            // to active whenever 'contacts.list' or one of its decendents is active.
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }]);


myApp.constant(
    'appConstants', {
        baseUrl : '/iconsult/',
        candEntity: 'candidates',
        vendEntity: 'vendors'
});

// myApp.provider({
//     $exceptionHandler: function(){
//         var handler = function(exception) {
//             if(exception.code == 403){
//                 console.log("User is not authorized for the request" + exception.message)
//                 alert("UnAuthorized Action - User does not have persmission to do " + exception.name )
//                 //but the user has sucessfully logged in , in this case we should show the header and sidebar
//             }else if(exception.code == 504){
//                 console.log("504 response received, change the state here to show add new records page or something");
//             }else{
//                 console.log(exception.message);
//                 alert(exception.message);
//             }
//         };
//         this.$get = function() {
//             return handler;
//         };
//     }
// });

/**********END OF app.js ******/