angular.module('Manage-Users').controller('ManageUsersListController', [ '$scope', 'userList', '$state', 'customModalService', function($scope, userList, $state, customModalService) {
	console.log('ManageUsersListController');

	$scope.gridOptions = { enableRowSelection : true, enableRowHeaderSelection : false };

	$scope.gridOptions.columnDefs = [ { field : 'id', displayName : 'ID' }, { field : 'email', displayName : 'Email' }, { field : 'name', displayName : 'Name' } ];

	$scope.gridOptions.multiSelect = false;
	$scope.gridOptions.modifierKeysToMultiSelect = false;
	$scope.gridOptions.noUnselect = true;

	$scope.gridOptions.onRegisterApi = function(gridApi) {
		$scope.gridApi = gridApi;
		gridApi.selection.on.rowSelectionChanged($scope, function(row) {
			$scope.selectedRow = row.entity;
		});
	};

	$scope.gridOptions.data = userList.data;

	$scope.addUser = function() {
		$state.go('Home.Manage-Users.Add-User');
	};

	$scope.editUser = function() {
		if ($scope.selectedRow) {
			$state.go('Home.Manage-Users.Edit-User', { id : $scope.selectedRow.id });
		} else {
			customModalService.open('Warning', 'Please select a row first');
		}
	};

} ]).controller('ManageUsersAddController', [ '$scope', 'createUser', function($scope, createUser) {
	console.log('ManageUsersAddController');

	$scope.user = createUser.data.data;
	console.log('createUser: ' + createUser);

} ]).controller('ManageUsersEditController', [ '$scope', 'editUser', function($scope, editUser) {
	console.log('ManageUsersEditController: ');
	
	$scope.user = editUser.data.data;
	console.log('editUser: ' + editUser);

} ]);