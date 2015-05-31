angular.module('common').controller('CustomModalInstanceCtrl', [ '$scope', '$modalInstance', 'title', 'message', function($scope, $modalInstance, title, message) {
	$scope.title = title;
	$scope.message = message;
	$scope.dismiss = function() {
		$modalInstance.dismiss('cancel');
	};
} ]);

angular.module('common').controller('UnsavedModalInstanceCtrl',
	[ '$scope', '$rootScope', '$modalInstance', '$state', 'toState', 'fromState', function($scope, $rootScope, $modalInstance, $state, toState, fromState) {
		$scope.getOut = function() {
			$modalInstance.dismiss('cancel');
			$rootScope.unbindStateChangeCoEHandler();
			$rootScope.unbindStateChangeCoEHandler = null;
			$state.go(toState.name);
		};
		$scope.stayBack = function() {
			$rootScope.linkID = (fromState.name.indexOf(".") == fromState.name.lastIndexOf(".") ? fromState.name : fromState.name.substring(0, fromState.name.lastIndexOf(".")));
			$modalInstance.dismiss('cancel');
		};
	} ]);