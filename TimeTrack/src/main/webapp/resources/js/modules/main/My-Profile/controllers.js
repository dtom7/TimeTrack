angular.module('My-Profile').controller('MyProfileController', [ '$scope', 'userPromise', function($scope, userPromise) {
	console.log('MyProfileController ..');

	$scope.user = userPromise.data.data;

} ]);