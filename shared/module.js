var Application = Application || {};

Application.shared = angular.module('iconsult.shared', ['fundoo.services','ui.bootstrap']);

Application.shared.value('genericModules', {
        'deleteDialog': '/shared/generic.delete.html',
        'deleteDialogTitle': 'Confirm Delete',
        'dateDialog' : '/shared/generic.dateDialog.html'
})
.value('toastr', window.toastr);
