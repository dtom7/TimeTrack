angular.module('Home').controller(
		'HomeController',
		[ '$scope', '$http', 'customModalService', 'LocalStorageService', '$state', 'userPromise', 'UserInfoService',
				function($scope, $http, customModalService, LocalStorageService, $state, userPromise, UserInfoService) {

					console.log('HomeController');

					$scope.userInfo = userPromise[0].data.userInfo;
					UserInfoService.userInfo = userPromise[0].data.userInfo;
					$scope.links = userPromise[1].data.links;

					$scope.logout = function() {
						LocalStorageService.unset('auth_token');
						$state.go('Login');
					};

				} ]).controller(
		'UserProfileController',
		[
				'$scope',
				'$http',
				'$timeout',
				'customModalService',
				'$window',
				'UserInfoService',
				function($scope, $http, $timeout, customModalService, $window, UserInfoService) {
					console.log('UserProfileController ..' + angular.toJson($scope.user));

					$scope.userRolesOrig = UserInfoService.userInfo.userRoles;
					$scope.formSubmitted = false;
					$scope.tabActive = true;
					$scope.originalUser = {};
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

					$scope.originalUser = angular.copy($scope.user);

					$scope.revert = function(myProfileForm) {
						console.log('Reverting ..');
						$scope.formSubmitted = false;
						$scope.user = angular.copy($scope.originalUser);
						// Calling set-pristine after digest cycle.
						if (myProfileForm) {
							$timeout(function() {
								myProfileForm.$setPristine();
							});
						}
					};

					$scope.submitForm = function(myProfileForm) {
						$scope.formSubmitted = true;
						if (myProfileForm.$valid) {
							console.log('No errors: ' + angular.toJson($scope.user));

							if (angular.equals($scope.user, $scope.originalUser)) {
								console.log('Nothing to save ..');
								customModalService.open("There is nothing to save");
							} else {
								$http({
									method : ($scope.user.id ? 'PUT' : 'POST'),
									url : 'users/' + ($scope.user.id ? $scope.user.id : ''),
									data : {
										success : true,
										data : $scope.user
									}
								}).success(function(rdata, status, headers, config) {
									console.log('Ajax OK: ' + angular.toJson(rdata));
									if (rdata.success) {
										console.log('New Version: ' + rdata.data.version);
										$scope.user = angular.copy(rdata.data);
										$scope.originalUser = angular.copy(rdata.data);
										// Calling set-pristine after digest
										// cycle.
										if (myProfileForm) {
											$timeout(function() {
												myProfileForm.$setPristine();
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
							console.log('Validation error(s)' + angular.toJson(myProfileForm.$error));

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
