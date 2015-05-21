angular.module('My-Profile').controller('MyProfileController', [ '$rootScope', '$scope', 'userPromise', function($rootScope, $scope, userPromise) {
	console.log('MyProfileController ..');

	//$rootScope.linkID = 'My-Profile';

	$scope.user = userPromise.data.data;

} ]);