angular.module('common').factory('customModalService', [ '$modal', function($modal) {
	console.log('In service');

	var customModal = {
		open : function(inmessage) {
			console.log('In service-open');
			var modalInstance = $modal.open({
				template : '<div class="modal-header"><h4 class="modal-title">Server Response</h4></div><div class="modal-body">{{ message }}</div><div class="modal-footer"><button class="btn btn-warning" ng-click="dismiss()">Dismiss</button></div>',
				controller : 'CustomModalInstanceCtrl',
				size : 'sm',
				resolve : {
					message : function() {
						return inmessage;
					}
				}
			});
		}
	};

	return customModal;

} ]);