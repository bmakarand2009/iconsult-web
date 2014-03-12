
Application.shared.directive('ngDeleteItemFromList', function() {
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