Ext.define('TT.controller.admin.AdminController', {
	extend : 'Ext.app.Controller',
	views : [ 'admin.ApproveTimesheets', 'admin.ManageClients', 'admin.ManageProjects', 'admin.ManageUsers' ],
    
	init : function() {
		this.control({
			'#Approve-Timesheets' : {
				render : this.onMyHomeRender
			}
		});
        this.application.on({
        	ManageUsersEvent: this.onManageUsersEvent,
            scope: this
        });
	},

	onMyHomeRender : function() {
		console.log('ApproveTimesheets onrender ...');
	},
	
	onManageUsersEvent : function() {
		console.log('ManageUsersEvent ...');

	}
});