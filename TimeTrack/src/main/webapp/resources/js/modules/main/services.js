angular.module('main').factory('responseChecker', [ '$window', function($window) {
	var responseChecker = {
		request : function(request) {
			console.log('responseChecker - request: ' + angular.toJson(request));

			return request;
		},
		response : function(response) {
			console.log('responseChecker - response: ' + angular.toJson(response));

			return response;
		},
		responseError: function(response) {
			console.log('responseChecker - responseError: ' + angular.toJson(response));
			//$window.location.assign($window.location.protocol + '//' + $window.location.host + '/TimeTrack/login.html');
			return response;		
		}
	};
	return responseChecker;
} ]);
