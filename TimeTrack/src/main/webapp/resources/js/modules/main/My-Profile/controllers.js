angular.module('My-Profile').controller('MyProfileController', [ '$scope', '$http', '$timeout', 'customModalService', function($scope, $http, $timeout, customModalService) {
	console.log('MyProfileController ..');

	$scope.$parent.linkID = 'My-Profile';
	$scope.formSubmitted = false;
	$scope.user = {};
	$scope.original = {};

	$http({
		method : 'GET',
		url : "getUser"
	}).success(function(data, status, headers, config) {
		console.log('Ajax Success: ' + angular.toJson(data));
		/* now get the full user object */
		$http({
			method : 'GET',
			url : "users/" + data.userInfo.id
		}).success(function(rdata, status, headers, config) {
			console.log('Ajax Success: ' + angular.toJson(rdata));
			$scope.user = angular.copy(rdata.data);
			$scope.original = angular.copy(rdata.data);
			// Calling set-pristine after digest cycle.
			if ($scope.myProfileForm) {
				$timeout(function() {
					$scope.myProfileForm.$setPristine();
				});
			}
		}).error(function(data, status, headers, config) {
			console.log('Ajax Failed: ' + angular.toJson(data));
			customModalService.open('Error communicating with server');
		});
	}).error(function(data, status, headers, config) {
		console.log('Ajax Failed: ' + angular.toJson(data));
		customModalService.open('Error communicating with server');
	});

	$scope.revert = function() {
		console.log('Reverting ..');
		$scope.formSubmitted = false;
		$scope.user = angular.copy($scope.original);
		// Calling set-pristine after digest cycle.
		if ($scope.myProfileForm) {
			$timeout(function() {
				$scope.myProfileForm.$setPristine();
			});
		}
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