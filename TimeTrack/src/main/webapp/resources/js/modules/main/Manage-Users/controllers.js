angular.module('Manage-Users').controller('ManageUsersController', [ '$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
	console.log('ManageUsersController');

	$scope.gridOptions = {
		enableRowSelection : true,
		enableRowHeaderSelection : false
	};

	$scope.gridOptions.columnDefs = [ {
		field : 'id',
		displayName : 'ID'
	}, {
		field : 'email',
		displayName : 'Email'
	}, {
		field : 'name',
		displayName : 'Name'
	} ];

	$scope.gridOptions.multiSelect = false;
	$scope.gridOptions.modifierKeysToMultiSelect = false;
	$scope.gridOptions.noUnselect = true;
	$scope.gridOptions.onRegisterApi = function(gridApi) {
		$scope.gridApi = gridApi;
	};

	$http.get($rootScope.mainURL + '/users/').success(function(data) {
		$scope.gridOptions.data = data;
	});

} ]);