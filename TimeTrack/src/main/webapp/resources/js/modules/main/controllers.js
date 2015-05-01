angular.module('main').controller('MainController', [ '$scope', '$http', 'customModalService', function($scope, $http, customModalService) {
	console.log('MainController ..');
	$scope.userInfo = {};
	$scope.links = [];
	$scope.linkID = 'Home';
	$scope.user = {};

	$http({
		method : 'GET',
		url : "getUser"
	}).success(function(data, status, headers, config) {
		console.log('Ajax Success: ' + angular.toJson(data));
		$scope.userInfo = data.userInfo;
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
		/* get the full user object */
		$http({
			method : 'GET',
			url : "users/" + $scope.userInfo.id
		}).success(function(rdata, status, headers, config) {
			console.log('Ajax Success: ' + angular.toJson(rdata));
			$scope.user = angular.copy(rdata.data);
			$scope.$broadcast('userDataReceived', $scope.user);
		}).error(function(data, status, headers, config) {
			console.log('Ajax Failed: ' + angular.toJson(data));
			customModalService.open('Error communicating with server');
		});
	}).error(function(data, status, headers, config) {
		console.log('Ajax Failed: ' + angular.toJson(data));
		customModalService.open('Error communicating with server');
	});

	$scope.logout = function() {
		$http({
			method : 'GET',
			url : "j_spring_security_logout"
		}).success(function(data, status, headers, config) {
			console.log('Ajax Success: ' + angular.toJson(data));
			window.location.assign(window.location.protocol + '//' + window.location.host + '/TimeTrack/login.html');
		}).error(function(data, status, headers, config) {
			console.log('Ajax Failed: ' + angular.toJson(data));
			customModalService.open('Error communicating with server');
		});
	}

} ]);
