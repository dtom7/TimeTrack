angular.module('My-Profile').controller('MyProfileController', [ '$scope', '$http', '$window', 'userPromise', function($scope, $http, $window, userPromise) {
	console.log('MyProfileController ..');

	$scope.$parent.linkID = 'My-Profile';
		
	$scope.user = userPromise.data.data; 

} ]);