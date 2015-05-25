// this service is only for storing the current user's roles which
// is used to hide some fields in the user profile form
angular.module('Home').factory('UserInfoService', [ function() {
	return {
		userInfo : {}
	};
} ]);
