angular.module('My-Profile').controller('MyProfileController', [ '$scope', '$http', '$timeout', 'customModalService', '$window', function($scope, $http, $timeout, customModalService, $window) {
	console.log('MyProfileController ..');

	$scope.$parent.linkID = 'My-Profile';
	$scope.formSubmitted = false;
	$scope.user = {};
	$scope.emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	$scope.userRoleStaticList = [ "ROLE_USER", "ROLE_ADMIN" ];
	$scope.cnfrmPassword = '';
	$scope.staticAddressTypes = [ 'HOME', 'WORK', 'BUSINESS' ];
	$scope.currentAddressTypes = ['HOME', 'BUSINESS'];
	$scope.radioAddressModel = '';

	try {

		$http({
			method : 'GET',
			url : "getUser"
		}).success(function(data, status, headers, config) {
			console.log('Ajax Success: ' + angular.toJson(status));
			/* now get the full user object */
			try {

				$http({
					method : 'GET',
					url : "users/" + data.userInfo.id
				}).success(function(rdata, status, headers, config) {
					console.log('Ajax Success: ' + angular.toJson(status));
					$scope.user = angular.copy(rdata.data);
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

	$scope.revert = function() {
		console.log('Reverting ..');
		$scope.formSubmitted = false;
		$scope.myProfileForm.reset();
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

			$http.put("users/" + $scope.user.id, {
				success : true,
				data : $scope.user
			}).success(function(rdata, status, headers, config) {
				console.log('Ajax PUT OK: ' + angular.toJson(rdata));
				if (rdata.success) {
					console.log('New Version: ' + rdata.data.version);
					$scope.user.version = rdata.data.version;
					// Calling set-pristine after digest cycle.
					if ($scope.myProfileForm) {
						$timeout(function() {
							$scope.myProfileForm.$setPristine();
						});
					}
					customModalService.open("Saved Successfully");
				} else {
					customModalService.open(rdata.message);
				}

			}).error(function(data, status, headers, config) {
				console.log('Ajax PUT Failed: ' + angular.toJson(data));
				customModalService.open('Error communicating with server');
			});

		} else {
			console.log('Validation error(s)' + angular.toJson($scope.user));

		}
	};

	$scope.$watch('user.password', function() {
		$scope.cnfrmPassword = '';
	});
	
	$scope.$watch('user.userAddresses', $scope.getCurrentAddressTypes);

	$scope.getCurrentAddressTypes = function() {
		var userAddresses = [];
		angular.forEach($scope.user.userAddresses, function(userAddress) {
			userAddresses.push(userAddress.addressType);
		});
		
		//$scope.currentAddressTypes = _.difference($scope.staticAddressTypes, userAddresses);
		//$scope.currentAddressTypes = ['TEST'];
		console.log('cat: ' + $scope.currentAddressTypes);
		$timeout(function(){
			$scope.currentAddressTypes.push('TEST');
		})
	};

} ]);