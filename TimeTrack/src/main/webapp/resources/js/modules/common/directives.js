angular.module('common').directive('confirmOnExit', function($rootScope, $state, unsavedModalService) {
	console.log('Init confirmOnExit ..');
	$rootScope.unbindStateChangeCoEHandler = null;
	return {
		link : function(scope, elem, attrs) {

			console.log('N - Form modified: ' + scope[attrs.name].modified);

			$rootScope.unbindStateChangeCoEHandler = $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
				if (scope[attrs.name].modified) {
					console.log('Form has changes .. ');
					event.preventDefault();
					unsavedModalService.open(toState);					
				} else {
					console.log('No changes .. ');
					$rootScope.unbindStateChangeCoEHandler();
					$rootScope.unbindStateChangeCoEHandler = null;
				}
			});
		}
	}

});