var app = angular.module('main', [ 'ui.bootstrap', 'ui.router', 'ui.grid', 'ui.grid.selection', 'common', 'ngInputModified', 'Login', 'Home', 'My-Profile', 'My-Notifications', 'Manage-Users',
		'Manage-Projects', 'Manage-Clients', 'Approve-Timesheets', 'My-Timesheets' ]);

app.config([ '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise(function($injector) {
		$injector.get('$state').transitionTo('Home');
	});

	$stateProvider.state('Home', {
		url : '/Home',
		templateUrl : 'resources/js/modules/main/Home/Home.html',
		controller : 'HomeController'
	}).state('Home.My-Profile', {
		url : '/My-Profile',
		templateUrl : 'resources/js/modules/main/My-Profile/MyProfile.html',
		resolve : {
			userPromise : function($http) {
				return $http.get('getUser').then(function(rdata) {
					return $http.get('users/' + rdata.data.userInfo.id);
				});
			}
		},
		controller : 'MyProfileController'
	}).state('Home.My-Notifications', {
		url : '/My-Notifications',
		templateUrl : 'resources/js/modules/main/My-Notifications/MyNotifications.html',
		controller : 'MyNotificationsController'
	}).state('Home.Manage-Users', {
		url : '/Manage-Users',
		templateUrl : 'resources/js/modules/main/Manage-Users/ManageUsers.html',
		controller : 'ManageUsersController'
	}).state('Home.Manage-Projects', {
		url : '/Manage-Projects',
		templateUrl : 'resources/js/modules/main/Manage-Projects/ManageProjects.html',
		controller : 'ManageProjectsController'
	}).state('Home.Manage-Clients', {
		url : '/Manage-Clients',
		templateUrl : 'resources/js/modules/main/Manage-Clients/ManageClients.html',
		controller : 'ManageClientsController'
	}).state('Home.Approve-Timesheets', {
		url : '/Approve-Timesheets',
		templateUrl : 'resources/js/modules/main/Approve-Timesheets/ApproveTimesheets.html',
		controller : 'ApproveTimesheetsController'
	}).state('Home.My-Timesheets', {
		url : '/My-Timesheets',
		templateUrl : 'resources/js/modules/main/My-Timesheets/MyTimesheets.html',
		controller : 'MyTimesheetsController'
	}).state('Login', {
		url : '/Login',
		controller : 'LoginController',
		templateUrl : 'resources/js/modules/main/Login/login.html'
	});

} ]).config([ 'inputModifiedConfigProvider', function(inputModifiedConfigProvider) {
	inputModifiedConfigProvider.disableGlobally();
} ]).config([ '$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
} ]).run([ '$rootScope', '$state', 'Auth', '$window', function($rootScope, $state, Auth, $window) {
	$rootScope.mainURL = $window.location.protocol + '//' + $window.location.host + '/TimeTrack';
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
		if (toState.name != 'Login') {
			/* this is for the link-focus class in Home.html */
			$rootScope.linkID = toState.name.replace('Home.', '');
			if (!Auth.isAuthenticated()) {
				event.preventDefault();
				$state.go('Login');
			}
		}
	});
} ]);
