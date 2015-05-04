angular.module('main').controller('MainController', [ '$scope', '$http', 'customModalService', '$window', function($scope, $http, customModalService, $window) {
	console.log('MainController ..');

	$scope.userInfo = {};
	$scope.links = [];
	$scope.linkID = 'Home';

	try {

		$http({
			method : 'GET',
			url : "getUser"
		}).success(function(data, status, headers, config) {
			console.log('Ajax Success: ' + angular.toJson(status));
			$scope.userInfo = data.userInfo;

			try {

				$http({
					method : 'GET',
					url : "getLinks"
				}).success(function(data, status, headers, config) {
					console.log('Ajax Success: ' + angular.toJson(data));
					$scope.links = data.links;
				}).error(function(data, status, headers, config) {
					console.log('Ajax Failed: ' + angular.toJson(data));
					customModalService.open('Error communicating with server');
				});

			} catch (err) {
				console.log('Error: ' + err);
				$window.location.assign($window.location.protocol + '//' + $window.location.host + '/TimeTrack/login.html');
			}

		}).error(function(data, status, headers, config) {
			console.log('Ajax Failed: ' + angular.toJson(data));
			customModalService.open('Error communicating with server');
		});

	} catch (err) {
		console.log('Error: ' + err);
		$window.location.assign($window.location.protocol + '//' + $window.location.host + '/TimeTrack/login.html');
	}

	$scope.logout = function() {
		$http({
			method : 'GET',
			url : "j_spring_security_logout"
		}).success(function(data, status, headers, config) {
			console.log('Ajax Success: ' + angular.toJson(data));
			$window.location.assign($window.location.protocol + '//' + $window.location.host + '/TimeTrack/login.html');
		}).error(function(data, status, headers, config) {
			console.log('Ajax Failed: ' + angular.toJson(data));
			customModalService.open('Error communicating with server');
		});
	};

} ]);
