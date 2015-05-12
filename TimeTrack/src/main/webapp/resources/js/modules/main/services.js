angular.module('main').factory('responseChecker', [ '$window', function($window) {
	var responseChecker = {
		response : function(response) {
			console.log('responseChecker - response.status: ' + angular.toJson(response));
			if (response.status == 419) {

			}
			return response;
		}
	};
	return responseChecker;
} ]);

angular.module('main').config([ '$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('responseChecker');
} ]);