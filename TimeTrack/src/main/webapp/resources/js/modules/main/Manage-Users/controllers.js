angular.module('Manage-Users').controller('ManageUsersController', [ '$rootScope', '$scope', '$http', '$window', function($rootScope, $scope, $http, $window) {
	console.log('ManageUsersController');
	//$rootScope.linkID = 'Manage-Users';
	
	$scope.user = {
			email: 'test@test.com',
			password: 'test',
			name: 'Test User',
			userRoles : [],
			userAddresses : [],
			userPhones : []
		};
	
} ]);