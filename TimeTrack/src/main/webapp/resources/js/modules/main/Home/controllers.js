angular.module('Home').controller('HomeController', [ '$scope', function($scope) {
	console.log('HomeController');
	$scope.$parent.linkID = 'Home';
} ]);