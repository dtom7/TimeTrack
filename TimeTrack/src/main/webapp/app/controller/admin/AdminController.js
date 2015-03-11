Ext.define('TT.controller.admin.AdminController', {
	extend : 'Ext.app.Controller',

	views : [ 'admin.ApproveTimesheets', 'admin.ManageClients', 'admin.ManageProjects', 'admin.ManageUsers' ],

	init : function() {
		this.control({
			'#Approve-Timesheets' : {
				render : this.onMyHomeRender
			}
		});
	},

	onMyHomeRender : function() {
		console.log('ApproveTimesheets onrender ...');
	}
});