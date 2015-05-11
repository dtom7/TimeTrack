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

} ]).controller(
		'UserProfileController',
		[
				'$scope',
				'$http',
				'$timeout',
				'customModalService',
				'$window',
				function($scope, $http, $timeout, customModalService, $window) {
					console.log('UserProfileController ..');

					$scope.formSubmitted = false;
					$scope.tabActive = true;
					$scope.originalUser = {};
					if ($scope.userDataProvided === 'no') {
						$scope.user = {
							userAddresses : [],
							userPhones : []
						};
					}
					$scope.emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					$scope.userRolesList = {
						oneValueSelected : true
					};
					$scope.cnfrmPassword = '';
					$scope.staticAddressTypes = [ 'HOME', 'WORK', 'BUSINESS' ];
					$scope.currentAddressTypes = {
						userAddresses : [],
						newAddressType : ''
					};
					$scope.staticPhoneTypes = [ 'HOME', 'WORK', 'MOBILE' ];
					$scope.currentPhoneTypes = {
						userPhones : [],
						newPhoneType : ''
					};

					if ($scope.userDataProvided === 'yes') {
						// This means user object is already provided
						console.log('userDataProvided = yes');
						$scope.originalUser = angular.copy($scope.user);
					} else {
						// This means user object is not already provided. Go
						// and get it now.
						console.log('userDataProvided = no');
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
										$scope.originalUser = angular.copy(rdata.data);
										// Calling set-pristine after digest
										// cycle.
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

					}

					$scope.revert = function() {
						console.log('Reverting ..');
						$scope.formSubmitted = false;
						$scope.user = angular.copy($scope.originalUser);
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

							if (angular.equals($scope.user, $scope.originalUser)) {
								console.log('Nothing to save ..');
								customModalService.open("There is nothing to save");
							} else {
								console.log('Something to save ..');
								$http.put("users/" + $scope.user.id, {
									success : true,
									data : $scope.user
								}).success(function(rdata, status, headers, config) {
									console.log('Ajax PUT OK: ' + angular.toJson(rdata));
									if (rdata.success) {
										console.log('New Version: ' + rdata.data.version);
										$scope.user = angular.copy(rdata.data);
										$scope.originalUser = angular.copy(rdata.data);
										// Calling set-pristine after digest
										// cycle.
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
							}

						} else {
							console.log('Validation error(s)' + angular.toJson($scope.myProfileForm.$error));

						}
					};

					$scope.$watch('user.password', function() {
						$scope.cnfrmPassword = '';
					});

					/* For user address */

					$scope.$watchCollection('user.userAddresses', function(newColl, oldColl) {
						var userAddresses = [];
						angular.forEach($scope.user.userAddresses, function(userAddress) {
							userAddresses.push(userAddress.addressType);
						});
						$scope.currentAddressTypes.userAddresses = _.difference($scope.staticAddressTypes, userAddresses);
					});

					$scope.addAddress = function(target) {
						$scope.user.userAddresses.push({
							addressType : target,
							address1 : '',
							address2 : '',
							city : '',
							state : '',
							zipCode : '',
							country : ''
						});
						$scope.currentAddressTypes.newAddressType = target;
						$scope.formSubmitted = false;
					};

					$scope.isAddressInvalid = function(form, addressType) {
						return $scope.formSubmitted
								&& (form["userAddress1_" + addressType].$invalid || form["userCity_" + addressType].$invalid || form["userState_" + addressType].$invalid
										|| form["userZipCode_" + addressType].$invalid || form["userCountry_" + addressType].$invalid);
					};

					$scope.deleteAddress = function(addressType) {
						var userAddresses = [];
						angular.forEach($scope.user.userAddresses, function(userAddress) {
							if (userAddress.addressType != addressType) {
								userAddresses.push(userAddress);
							}
							$scope.user.userAddresses = userAddresses;
						});
					};

					/* For user phones */

					$scope.$watchCollection('user.userPhones', function(newColl, oldColl) {
						var userPhones = [];
						angular.forEach($scope.user.userPhones, function(userPhone) {
							userPhones.push(userPhone.phoneType);
						});
						$scope.currentPhoneTypes.userPhones = _.difference($scope.staticPhoneTypes, userPhones);
					});

					$scope.addPhone = function(target) {
						$scope.user.userPhones.push({
							phoneType : target,
							phoneNumber : ''
						});
						$scope.currentPhoneTypes.newPhoneType = target;
						$scope.formSubmitted = false;
					};

					$scope.isPhoneInvalid = function(form, phoneType) {
						return $scope.formSubmitted && form["userPhoneNumber_" + phoneType].$invalid;
					};

					$scope.deletePhone = function(phoneType) {
						var userPhones = [];
						angular.forEach($scope.user.userPhones, function(userPhone) {
							if (userPhone.phoneType != phoneType) {
								userPhones.push(userPhone);
							}
							$scope.user.userPhones = userPhones;
						});
					};

				} ]);
