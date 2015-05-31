angular.module('common').directive('confirmOnExit', function($rootScope, $state, unsavedModalService) {
	//console.log('Init confirmOnExit ..');
	$rootScope.unbindStateChangeCoEHandler = null;
	return {
		link : function(scope, elem, attrs) {
			//console.log('unbindStateChangeCoEHandler .. ');
			$rootScope.unbindStateChangeCoEHandler = $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
				//console.log('$stateChangeStart2: to ' + toState.name + ' -- from ' + fromState.name);
					if (!angular.equals(scope[attrs.current], scope[attrs.original])) {
						console.log('Form has changes .. ');
						event.preventDefault();
						unsavedModalService.open(toState, fromState);
					} else {
						console.log('No changes .. ');
						$rootScope.unbindStateChangeCoEHandler();
						$rootScope.unbindStateChangeCoEHandler = null;
					}
			});

		}
	};

});