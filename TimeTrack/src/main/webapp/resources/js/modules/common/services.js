angular
	.module('common')
	.factory(
		'customModalService',
		[
			'$modal',
			function($modal) {
				console.log('In customModalService');

				var customModal = {
					open : function(intitle, inmessage) {
						console.log('In service-open');
						var modalInstance = $modal
							.open({
								template : '<div class="modal-header"><h4 class="modal-title">{{ title }}</h4></div><div class="modal-body">{{ message }}</div><div class="modal-footer"><button class="btn btn-warning" ng-click="dismiss()">Dismiss</button></div>',
								controller : 'CustomModalInstanceCtrl',
								size : 'sm',
								resolve : {
									title : function() {
										return intitle;
									},
									message : function() {
										return inmessage;
									}
								}
							});
					}
				};

				return customModal;

			} ]);

angular
	.module('common')
	.factory(
		'unsavedModalService',
		[
			'$modal',
			function($modal) {
				console.log('In unsavedModalService');

				var unsavedModal = {
					open : function(inToState, inFromState) {
						console.log('In service-open');
						var modalInstance = $modal
							.open({
								template : '<div class="modal-header"><h4 class="modal-title">This form has unsaved change(s)</h4></div><div class="modal-body">Are you sure you want to discard them?</div><div class="modal-footer"><button class="btn btn-warning" ng-click="getOut()">Yes</button><button class="btn btn-warning" ng-click="stayBack()">No</button></div>',
								controller : 'UnsavedModalInstanceCtrl',
								size : 'sm',
								resolve : {
									toState : function() {
										return inToState;
									},
									fromState : function() {
										return inFromState;
									}
								}
							});
					}
				};

				return unsavedModal;

			} ]);
