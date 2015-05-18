var app = angular.module('main', [ 'ui.bootstrap', 'ui.router', 'common', 'ngInputModified', 'Login', 'Home', 'My-Profile', 'My-Notifications', 'Manage-Users', 'Manage-Projects', 'Manage-Clients',
		'Approve-Timesheets', 'My-Timesheets' ]);

app.config([ '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/Home');

	$stateProvider.state('Home', {
		url : '/Home',
		templateUrl : 'resources/js/modules/main/Home/Home.html',
		controller : 'HomeController'
	}).state('My-Profile', {
		url : '/My-Profile',
		templateUrl : 'resources/js/modules/main/My-Profile/MyProfile.html',
		resolve : {
			userPromise : function($http, $window) {
				try {
					return $http.get('getUser').then(function(rdata) {
						try {
							return $http.get('users/' + rdata.data.userInfo.id);
						} catch (err) {
							console.log('Error: ' + err);
							$window.location.assign($window.location.protocol + '//' + $window.location.host + '/TimeTrack/login.html');
						}
					});
				} catch (err) {
					console.log('Error: ' + err);
					$window.location.assign($window.location.protocol + '//' + $window.location.host + '/TimeTrack/login.html');
				}
			}
		},
		controller : 'MyProfileController'
	}).state('My-Notifications', {
		url : '/My-Notifications',
		templateUrl : 'resources/js/modules/main/My-Notifications/MyNotifications.html',
		controller : 'MyNotificationsController'
	}).state('Manage-Users', {
		url : '/Manage-Users',
		templateUrl : 'resources/js/modules/main/Manage-Users/ManageUsers.html',
		controller : 'ManageUsersController'
	}).state('Manage-Projects', {
		url : '/Manage-Projects',
		templateUrl : 'resources/js/modules/main/Manage-Projects/ManageProjects.html',
		controller : 'ManageProjectsController'
	}).state('Manage-Clients', {
		url : '/Manage-Clients',
		templateUrl : 'resources/js/modules/main/Manage-Clients/ManageClients.html',
		controller : 'ManageClientsController'
	}).state('Approve-Timesheets', {
		url : '/Approve-Timesheets',
		templateUrl : 'resources/js/modules/main/Approve-Timesheets/ApproveTimesheets.html',
		controller : 'ApproveTimesheetsController'
	}).state('My-Timesheets', {
		url : '/My-Timesheets',
		templateUrl : 'resources/js/modules/main/My-Timesheets/MyTimesheets.html',
		controller : 'MyTimesheetsController'
	}).state('Login', {
		url : '/Login',
		templateUrl : 'resources/js/modules/main/login/login.html',
		controller : 'LoginController'
	});

} ]).config(function(inputModifiedConfigProvider) {
	inputModifiedConfigProvider.disableGlobally();
}).config([ '$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
} ]).run([ '$rootScope', '$state', 'Auth', function($rootScope, $state, Auth) {
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
		if (!toState.name === 'Login') {
		if (!Auth.isAuthenticated()) {
			console.log('Not authenticated: ' + angular.toJson(toState) + ' ' + angular.toJson(fromState));
			event.preventDefault();
			$state.go('Login');
		} else {
			console.log('Authenticated: ' + angular.toJson(toState) + ' ' + angular.toJson(fromState));

		}
		}
	});
} ]);
