angular.module('My-Profile').controller('MyProfileController', [ '$scope', '$http', 'customModalService', function($scope, $http, customModalService) {
	console.log('MyProfileController');
	$scope.$parent.linkID = 'My-Profile';

	$scope.formSubmitted = false;

	var original = angular.copy($scope.user);
	$scope.revert = function() {
		console.log('Reverting ..');
		$scope.formSubmitted = false;
		$scope.user = angular.copy(original);
		$scope.myProfileForm.$setPristine();
	};

	$scope.submitForm = function() {
		$scope.formSubmitted = true;
		if ($scope.myProfileForm.$valid) {
			console.log('No errors: ' + angular.toJson($scope.user));

		} else {
			console.log('Validation error(s)' + angular.toJson($scope.user));
		}
	};

} ]);