angular.module('login').controller('LoginController', [ '$scope', '$http', '$location', function($scope, $http, $location) {
	$scope.user = {};
	$scope.user.email = '';
	$scope.user.password = '';
	$scope.formSubmitted = false;

	var original = angular.copy($scope.user);
	$scope.revert = function() {
		console.log('Reverting L');
		$scope.formSubmitted = false;
		$scope.user = angular.copy(original);
		$scope.loginForm.$setPristine();
	};

	$scope.submitForm = function() {
		$scope.formSubmitted = true;
		if ($scope.loginForm.$valid) {
			console.log('No errors L: ' + angular.toJson($scope.user));
			console.log(angular.toJson(window.location.protocol));
			$http({
				method : 'POST',
				url : "j_spring_security_check",
				transformRequest : function(obj) {
					var str = [];
					for ( var p in obj)
						str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					return str.join("&");
				},
				data : {
					j_username : $scope.user.email,
					j_password : $scope.user.password
				},
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8'
				}
			}).success(function(data, status, headers, config) {
				console.log('Ajax Success: ' + angular.toJson(data));
				window.location.assign(window.location.protocol + '//' + window.location.host + '/TimeTrack/');
			}).error(function(data, status, headers, config) {
				console.log('Ajax Failed: ' + angular.toJson(data));
			});

		} else {
			console.log('Validation error L !');
		}
	};

} ]);

angular.module('login').controller('ForgetPswController', [ '$scope', function($scope) {
	$scope.user = {};
	$scope.user.email = '';
	$scope.formSubmitted = false;

	var original = angular.copy($scope.user);
	$scope.revert = function() {
		console.log('Reverting F');
		$scope.formSubmitted = false;
		$scope.user = angular.copy(original);
		$scope.forgotPswForm.$setPristine();
	};

	$scope.submitForm = function() {
		$scope.formSubmitted = true;
		if ($scope.forgotPswForm.$valid)
			console.log('No errors F: ' + angular.toJson($scope.user));
		else
			console.log('Validation error F !');
	};

} ]);
