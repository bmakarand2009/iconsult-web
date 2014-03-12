/*******START OF app.js*******/
// Make sure to include the `ui.router` module as a dependency
//var myApp = angular.module('myApp', ['ngResource','ui.router','http-auth-interceptor','ngCookies','ngRoute','iconsult.shared'])
var Application = Application || {};
Application.main = angular.module('iconsult.main', ['ngResource','ui.router','http-auth-interceptor','ngCookies','ngRoute',
                                'iconsult.shared','iconsult.admin','iconsult.vendors','iconsult.candidates','iconsult.people'])
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


Application.main.constant(
    'appConstants', {
        baseUrl : '/',
        candEntity: 'candidates',
        vendEntity: 'vendors',
        peopleEntity:'people',
        companyEntity:'company'

});

/**********END OF app.js ******/