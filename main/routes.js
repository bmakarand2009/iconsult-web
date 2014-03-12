
/***********START OF states.js *******/
  Application.main.config(
    [          '$stateProvider', '$urlRouterProvider',
      function ($stateProvider,   $urlRouterProvider) {
         $urlRouterProvider
           .when('/c?id', '/candidates/view/:id')
           .when('/user/:id', '/contacts/:id')
           .when('', '/#')
           .when('/myModal','/myModal')
           .otherwise('/invalid');

        // Use $stateProvider to configure your states.
        $stateProvider
          .state("home", {
            url: "/",
          })
          .state('invalid', {
            url: '/invalid',
            templateUrl: 'admin/404.html',
          })
          .state('undercons', {
            url: '/undercons',
            templateUrl: 'admin/underconstruction.html',
          })
          .state("login", {
            url: "/login",
            templateUrl: 'admin/login.html',
          })
          .state('about', {
            url: '/about',
            templateProvider: ['$timeout',
              function (        $timeout) {
                return $timeout(function () {
                  return '<p class="lead">UI-Router Resources</p><ul>' +
                           '<li><a href="https://github.com/angular-ui/ui-router/tree/master/sample">Source for this Sample</a></li>' +
                           '<li><a href="https://github.com/angular-ui/ui-router">Github Main Page</a></li>' +
                           '<li><a href="https://github.com/angular-ui/ui-router#quick-start">Quick Start</a></li>' +
                           '<li><a href="https://github.com/angular-ui/ui-router/wiki">In-Depth Guide</a></li>' +
                           '<li><a href="https://github.com/angular-ui/ui-router/wiki/Quick-Reference">API Reference</a></li>' +
                         '</ul>';
                }, 100);
              }]
          })
          // CANDIDATES
          .state('Candidates', {
            abstract: true,
            url: '/candidates',
            templateUrl: 'candidates/candidates.html',
            resolve: {
                entDetails: ['appConstants',function(appConstants) {
                  return {
                    name: appConstants.candEntity
                  }
                }]
            }
          })
          .state('Candidates.list', {
            url: '',
            templateUrl: 'candidates/candidates-list.html',
            //controller: 'CandidatesController'
            controller: 'RecListController'

          })
          .state('Candidates.view',{
            //url:'/view/:id',
            url: '/{id:[0-9]{1,4}}',
            templateUrl:'candidates/candidates-view.html',
            controller: 'RecViewController'

          })
          .state('Candidates.edit',{
            url:'/edit/:id',
            templateUrl:'candidates/candidates-edit.html'

          })
          .state('Candidates.add',{
            url:'/add',
            templateUrl:'candidates/candidates-add.html'
          })

          //VENDORS
          .state('Vendors', {
            abstract: true,
            url: '/vendors',
            templateUrl: 'vendors/vendors.html',
            resolve: {
                entDetails: ['appConstants',function(appConstants) {
                  return {
                    name: appConstants.vendEntity
                  }
                }]
            }
          })
          .state('Vendors.list', {
            url: '',
            templateUrl: 'vendors/vendors-list.html',
            controller: 'ListClientPagingCtrl'

          })
          .state('Vendors.view',{
            //url:'/view/:id',
            url: '/{id:[0-9]{1,4}}',
            templateUrl:'vendors/vendors-view.html',
            //controller: 'ListPagingCtrl'

          })
          .state('Vendors.edit',{
            url:'/edit/:id',
            templateUrl:'vendors/vendors-edit.html'

          })
          .state('Vendors.add',{
            url:'/add',
            templateUrl:'vendors/vendors-add.html',
            controller:'VendorAddController'
          })


          //PEOPLE
          .state('People', {
            abstract: true,
            url: '/people',
            templateUrl: 'people/people.html',
            resolve: {
                entDetails: ['appConstants',function(appConstants) {
                  return {
                    name: appConstants.peopleEntity
                  }
                }]
            }
          })
          .state('People.list', {
            url: '',
            templateUrl: 'people/people.list.html',
            controller: 'ListClientPagingCtrl'

          })
          .state('People.view',{
            //url:'/view/:id',
            url: '/{id:[0-9]{1,4}}',
            templateUrl:'people/people.view.html',
            //controller: 'ListPagingCtrl'

          })
          .state('People.edit',{
            url:'/edit/:id',
            templateUrl:'people/people.edit.html'

          })
          .state('People.add',{
            url:'/add',
            templateUrl:'people/people.add.html',
            controller:'PeopleAddController'
          })
          //End of People
      }]);


/***********END OF states.js *******/
