angular.module('common').controller('CustomModalInstanceCtrl', [ '$scope', '$modalInstance', 'title', 'message', function($scope, $modalInstance, title, message) {
	$scope.title = title;
	$scope.message = message;
	$scope.dismiss = function() {
		$modalInstance.dismiss('cancel');
	};
} ]);

angular.module('common').controller('UnsavedModalInstanceCtrl', [ '$scope', '$rootScope', '$modalInstance', '$state', 'toState', function($scope, $rootScope, $modalInstance, $state, toState) {
	$scope.getOut = function() {
		$modalInstance.dismiss('cancel');
		$rootScope.unbindStateChangeCoEHandler();
		$rootScope.unbindStateChangeCoEHandler = null;
		$state.go(toState.name);
	};
	$scope.stayBack = function() {
		$modalInstance.dismiss('cancel');
	};
} ]);