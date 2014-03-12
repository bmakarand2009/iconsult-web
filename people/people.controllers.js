/***********START OF PeopleCtrl.js *******/

'use strict';
/* LIST CLIENTS PAGE  testing the comment*/
Application.people.controller('PeoplesController',['$scope','entDetails', function($scope,entDetails) {

    $scope.$on('$viewContentLoaded', function() {
      //$(".assign-list").dataTable();
       //alert("list template loaded");
       //alert(jQuery("#msgid").val());
        //$("#dateOfBirthDisplay").text(person.name);//new Date().toDateString());
        jQuery("#mypan").text("hey V2 loaded you DYNNAVI VERSION 2from JQUERY" + entDetails.name);

    });

}])

Application.people.controller('PeoplesViewController',['$scope','$stateParams', 'entDetails',
            function($scope,$stateParams,entDetails) {

    $scope.$on('$viewContentLoaded', function() {
      //$(".assign-list").dataTable();
       //alert("template loaded");
       //alert(jQuery("#msgid").val());
        //$("#dateOfBirthDisplay").text(person.name);//new Date().toDateString());
        jQuery("#viewid1").text("HEELLO WVIEW" + entDetails.name + $stateParams.id);

    });

}])
/**********END OF PeopleCtrl.js *******/
