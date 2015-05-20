angular.module('main').factory('AuthInterceptor', [ '$q', '$injector', function($q, $injector) {
	var responseChecker = {
		request : function(request) {
			var authToken = $injector.get('LocalStorageService').get('auth_token');
			if (authToken) {
				request.headers['X-AUTH-TOKEN'] = authToken;
			}
			return request;
		},
		response : function(response) {
			// console.log('AuthInterceptor - response: ' +
			// angular.toJson(response));

			return response;
		},
		responseError : function(response) {
			console.log('AuthInterceptor - responseError: ' + response.status);
			if (response.status === 401 || response.status === 403) {
				$injector.get('LocalStorageService').unset('auth_token');
				$injector.get('$state').go('Login');
			}
			return $q.reject(response);
		}
	};
	return responseChecker;
} ]).factory('LocalStorageService', function() {
	return {
		get : function(key) {
			return localStorage.getItem(key);
		},
		set : function(key, val) {
			return localStorage.setItem(key, val);
		},
		unset : function(key) {
			return localStorage.removeItem(key);
		}
	};
}).factory('Auth', [ 'LocalStorageService', function(LocalStorageService) {

	return {
		isAuthenticated : function() {
			return LocalStorageService.get('auth_token');
		}
	};

} ]);
