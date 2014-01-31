var Application = Application || {};

Application.Shared = angular.module('iconsult.shared', ['fundoo.services','ui.bootstrap']);

Application.Shared.value('genericModules', {
        'deleteDialog': '/shared/generic.delete.html',
        'deleteDialogTitle': 'Confirm Delete',
        'dateDialog' : '/shared/generic.dateDialog.html'
})
.value('toastr', window.toastr);
