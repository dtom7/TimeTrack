angular.module('Manage-Users').controller('ManageUsersListController', [ '$scope', 'userList', '$state', function($scope, userList, $state) {
	console.log('ManageUsersListController');

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

	$scope.gridOptions.data = userList.data;

	$scope.addUser = function() {
		$state.go('Home.Manage-Users.Add-User');
	};

} ]).controller('ManageUsersAddController', [ '$scope', 'dummyUser', function($scope, dummyUser) {
	console.log('ManageUsersAddController');

	$scope.user = dummyUser.data.data;
	console.log('dummyUser: ' + dummyUser);

} ]).controller('ManageUsersEditController', [ '$scope', function($scope) {
	console.log('ManageUsersEditController');

} ]);