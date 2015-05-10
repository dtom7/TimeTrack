var app = angular.module('main', [ 'ui.bootstrap', 'ui.router', 'common', 'ngInputModified', 'Home', 'My-Profile', 'My-Notifications', 'Manage-Users', 'Manage-Projects', 'Manage-Clients',
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
	});

} ]).config(function(inputModifiedConfigProvider) {
	inputModifiedConfigProvider.disableGlobally();
});
