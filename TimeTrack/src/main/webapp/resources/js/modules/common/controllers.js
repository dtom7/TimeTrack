angular.module('common').controller('CustomModalInstanceCtrl', function($scope, $modalInstance, message) {
	$scope.message = message;
	$scope.dismiss = function() {
		$modalInstance.dismiss('cancel');
	};
});