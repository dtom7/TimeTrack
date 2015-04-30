angular.module('My-Notifications').controller('MyNotificationsController', [ '$scope', function($scope) {
	console.log('MyNotificationsController');
	$scope.$parent.linkID = 'My-Notifications';
} ]);