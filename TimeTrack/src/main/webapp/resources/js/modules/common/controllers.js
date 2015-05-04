angular.module('common').controller('CustomModalInstanceCtrl', function($scope, $modalInstance, message) {
	$scope.message = message;
	$scope.dismiss = function() {
		$modalInstance.dismiss('cancel');
	};
});

angular.module('common').controller('UnsavedModalInstanceCtrl', function($scope, $rootScope, $modalInstance, $state, toState) {
	$scope.getOut = function() {
		$modalInstance.dismiss('cancel');
		$rootScope.unbindStateChangeCoEHandler();
		$rootScope.unbindStateChangeCoEHandler = null;
		$state.go(toState.name);
	};
	$scope.stayBack = function() {
		$modalInstance.dismiss('cancel');
	};
});