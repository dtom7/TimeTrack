var app = angular.module('main', [ 'ui.bootstrap', 'ui.router', 'ui.grid', 'ui.grid.selection', 'common', 'ngInputModified', 'Login', 'Home', 'My-Profile', 'My-Notifications', 'Manage-Users',
	'Manage-Projects', 'Manage-Clients', 'Approve-Timesheets', 'My-Timesheets' ]);

app.config([ '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise(function($injector) {
		$injector.get('$state').transitionTo('Home');
	});

	$stateProvider.state('Home', {
		url : '/Home',
		templateUrl : 'resources/js/modules/main/Home/Home.html',
		resolve : {
			userPromise : function($http, $q) {
				var promise1 = $http({
					method : 'GET',
					url : 'getUser'
				});
				var promise2 = $http({
					method : 'GET',
					url : 'getLinks'
				});
				return $q.all([ promise1, promise2 ]);
			}
		},
		controller : 'HomeController'
	// Start - My-Profile
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
	// Start - My-Notifications
	}).state('Home.My-Notifications', {
		url : '/My-Notifications',
		templateUrl : 'resources/js/modules/main/My-Notifications/MyNotifications.html',
		controller : 'MyNotificationsController'
	// Start - Manage-Users
	}).state('Home.Manage-Users', {
		url : '/Manage-Users',
		templateUrl : 'resources/js/modules/main/Manage-Users/ManageUsers.html'
	}).state('Home.Manage-Users.List-Users', {
		url : '',
		templateUrl : 'resources/js/modules/main/Manage-Users/ManageUsersList.html',
		resolve : {
			userList : function($http) {
				return $http.get('users/');
			}
		},
		controller : 'ManageUsersListController'
	}).state('Home.Manage-Users.Add-User', {
		url : '/addUser',
		templateUrl : 'resources/js/modules/main/Manage-Users/ManageUsersAdd.html',
		resolve : {
			createUser : function($http) {
				return $http.get('users/-1');
			}
		},
		controller : 'ManageUsersAddController'
	}).state('Home.Manage-Users.Edit-User', {
		url : '/editUser/:id',
		templateUrl : 'resources/js/modules/main/Manage-Users/ManageUsersEdit.html',
		resolve : {
			editUser : function($http, $stateParams) {
				return $http.get('users/' + $stateParams.id);
			}
		},
		controller : 'ManageUsersEditController'
	// Start - Manage-Projects
	}).state('Home.Manage-Projects', {
		url : '/Manage-Projects',
		templateUrl : 'resources/js/modules/main/Manage-Projects/ManageProjects.html',
		controller : 'ManageProjectsController'
	// Start - Manage-Clients
	}).state('Home.Manage-Clients', {
		url : '/Manage-Clients',
		templateUrl : 'resources/js/modules/main/Manage-Clients/ManageClients.html',
		controller : 'ManageClientsController'
	// Start - Approve-Timesheets
	}).state('Home.Approve-Timesheets', {
		url : '/Approve-Timesheets',
		templateUrl : 'resources/js/modules/main/Approve-Timesheets/ApproveTimesheets.html',
		controller : 'ApproveTimesheetsController'
	// Start - My-Timesheets
	}).state('Home.My-Timesheets', {
		url : '/My-Timesheets',
		templateUrl : 'resources/js/modules/main/My-Timesheets/MyTimesheets.html',
		controller : 'MyTimesheetsController'
	// Start - Login
	}).state('Login', {
		url : '/Login',
		controller : 'LoginController',
		templateUrl : 'resources/js/modules/main/Login/login.html'
	});

} ]).config([ 'inputModifiedConfigProvider', function(inputModifiedConfigProvider) {
	inputModifiedConfigProvider.disableGlobally();
} ]).config([ '$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
} ]).run(
	[
		'$rootScope',
		'$state',
		'Auth',
		'$window',
		function($rootScope, $state, Auth, $window) {
			$rootScope.mainURL = $window.location.protocol + '//' + $window.location.host + '/TimeTrack';
			$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
				if (toState.name != 'Login') {
					/* this is for the link-focus class in Home.html */
					$rootScope.linkID = (toState.name.indexOf(".") == toState.name.lastIndexOf(".") ? toState.name.replace('Home.', '') : toState.name.substring(toState.name.indexOf(".") + 1,
						toState.name.lastIndexOf(".")));
					if (!Auth.isAuthenticated()) {
						event.preventDefault();
						$state.go('Login');
					} else {
						if (toState.name === 'Home.Manage-Users') {
							event.preventDefault();
							$state.go('Home.Manage-Users.List-Users');
						}
					}
				}
			});
		} ]);
