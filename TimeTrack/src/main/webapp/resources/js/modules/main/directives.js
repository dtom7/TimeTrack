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
});