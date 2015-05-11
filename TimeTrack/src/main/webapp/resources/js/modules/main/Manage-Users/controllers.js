angular.module('Manage-Users').controller('ManageUsersController', [ '$scope', function($scope) {
	console.log('ManageUsersController');
	$scope.$parent.linkID = 'Manage-Users';
	
	$scope.user = {
			email: 'test@test.com',
			password: 'test',
			name: 'Test User',
			userAddresses : [],
			userPhones : []
		};
	
} ]);