angular.module('main').directive('cnfrmpsw', function() {
	return {
		require : 'ngModel',
		link : function(scope, elm, attrs, ngModel) {
			ngModel.$validators.cnfrmpsw = function(modelValue, viewValue) {
				if (scope.myProfileForm.userPassword.modified) {
					if (viewValue === scope.myProfileForm.userPassword.$viewValue) {
						return true;
					} else {
						return false;
					}
				} else {
					return true;
				}
			};
		}
	};
}).directive('userRoleRequired', function() {
	return {
		restrict : 'A',
		require : 'ngModel',
		link : function(scope, elm, attrs, ngModel) {
			ngModel.$validators.userRoleRequired = function(modelValue, viewValue) {
				var oneValueSelected = false;
				angular.forEach(scope.user.userRoles, function(userRole) {
					if (scope.myProfileForm['user.userRoles[' + userRole.role + ']'].$viewValue == true) {
						oneValueSelected = true;
					}
				});
				scope.userRolesList.oneValueSelected = oneValueSelected;
				// if oneValueSelected, set the validity of the other
				// check-box(s)
				// to true since this has to work as a single unit
				if (oneValueSelected) {
					angular.forEach(scope.user.userRoles, function(userRole) {
						if (ngModel.$name.indexOf(userRole.role) == -1) {
							scope.myProfileForm['user.userRoles[' + userRole.role + ']'].$setValidity('userRoleRequired', true);
						}
					});
				}
				return oneValueSelected;
			};
		}
	};
}).directive('userProfile', function() {
	return {
		restrict : 'A',
		scope : {
			userDataProvided: '@',
			user: '=?user'
		},
		templateUrl : 'resources/js/modules/main/views/UserProfile.html',
		controller: 'UserProfileController'
	};
});