angular.module('My-Profile').controller('MyProfileController',
		[ '$scope', '$http', 'customModalService', function($scope, $http, customModalService) {
			console.log('MyProfileController');
			$scope.$parent.linkID = 'My-Profile';

			$scope.formSubmitted = false;
			/* $scope.user is coming from MainController */
			var original = $scope.user || {};
			$scope.$on('userDataReceived', function(event, mass) {
				console.log('userDataReceived: ');
				original = angular.copy($scope.user);
			});

			$scope.revert = function() {
				console.log('Reverting ..');
				$scope.formSubmitted = false;
				$scope.$parent.user = angular.copy(original);
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