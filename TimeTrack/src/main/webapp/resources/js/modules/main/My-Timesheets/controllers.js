angular.module('My-Timesheets').controller('MyTimesheetsController', [ '$scope', function($scope) {
	console.log('MyTimesheetsController');
	$scope.$parent.linkID = 'My-Timesheets';
} ]);