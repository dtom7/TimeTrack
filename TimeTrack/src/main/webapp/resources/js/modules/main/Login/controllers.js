angular.module('Login').controller('LoginController',
		[ '$scope', '$http', '$location', 'customModalService', 'LocalStorageService', function($scope, $http, $location, customModalService, LocalStorageService) {
			console.log('LoginController');
			$scope.user = {};
			$scope.user.email = '';
			$scope.user.password = '';
			$scope.formSubmitted = false;

			var original = angular.copy($scope.user);
			$scope.revert = function(loginForm) {
				console.log('Reverting L');
				$scope.formSubmitted = false;
				$scope.user = angular.copy(original);
				loginForm.$setPristine();
			};

			$scope.submitForm = function(loginForm) {
				$scope.formSubmitted = true;
				if (loginForm.$valid) {
					// console.log('No errors L: ' +
					// angular.toJson($scope.user));
					// console.log(angular.toJson(window.location.protocol));
					$http({
						method : 'POST',
						url : "login",
						transformRequest : function(obj) {
							var str = [];
							for ( var p in obj)
								str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
							return str.join("&");
						},
						data : {
							username : $scope.user.email,
							password : $scope.user.password
						},
						headers : {
							'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8'
						}
					}).success(function(data, status, headers, config) {
						console.log('Ajax Success: ' + headers('X-AUTH-TOKEN'));
						if (data.msg === 'Login Success') {
							LocalStorageService.set('auth_token', headers('X-AUTH-TOKEN'));
							window.location.assign(window.location.protocol + '//' + window.location.host + '/TimeTrack/');
						} else {
							LocalStorageService.unset('auth_token');
							customModalService.open('Server Response', data.msg);
						}
					}).error(function(data, status, headers, config) {
						LocalStorageService.unset('auth_token');
						console.log('Ajax failed: ' + angular.toJson(data));
						customModalService.open('Warning', 'Error communicating with server');
					});

				} else {
					console.log('Validation error L !');
				}
			};

		} ]);

angular.module('Login').controller('ForgetPswController', [ '$scope', function($scope) {
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
