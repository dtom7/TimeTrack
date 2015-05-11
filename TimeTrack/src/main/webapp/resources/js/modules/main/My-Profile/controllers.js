angular.module('My-Profile').controller('MyProfileController', [ '$scope', function($scope) {
	console.log('MyProfileController ..');

	$scope.$parent.linkID = 'My-Profile';

} ]);