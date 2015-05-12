angular.module('Manage-Users').controller('ManageUsersController', [ '$scope', '$http', '$window', function($scope, $http, $window) {
	console.log('ManageUsersController');
	$scope.$parent.linkID = 'Manage-Users';
	
	$scope.user = {
			email: 'test@test.com',
			password: 'test',
			name: 'Test User',
			userRoles : [],
			userAddresses : [],
			userPhones : []
		};
	
} ]);