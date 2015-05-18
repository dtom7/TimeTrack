angular.module('main').factory('AuthInterceptor', [ '$q', '$injector', function($q, $injector) {
	var responseChecker = {
		request : function(request) {
			console.log('AuthInterceptor - request: ' + angular.toJson(request));

			return request;
		},
		response : function(response) {
			console.log('AuthInterceptor - response: ' + angular.toJson(response));

			return response;
		},
		responseError : function(response) {
			console.log('AuthInterceptor - responseError: ' + angular.toJson(response));
			// $window.location.assign($window.location.protocol + '//' +
			// $window.location.host + '/TimeTrack/login.html');
			if (response.status === 401 || response.status === 403) {
				$injector.get('LocalStorageService').unset('auth_token');
				//$injector.get('$state').go('Login');
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
}).factory('Auth', [ '$http', 'LocalStorageService', function($http, LocalStorageService) {

	return {
		isAuthenticated : function() {
			return LocalStorageService.get('auth_token');
		},
		login : function(credentials) {
			var login = $http.post('/auth/authenticate', credentials);
			login.success(function(result) {
				LocalStorageService.set('auth_token', JSON.stringify(result));
			});
			return login;
		},
		logout : function() {
			LocalStorageService.unset('auth_token');
		}
	};

} ]);
