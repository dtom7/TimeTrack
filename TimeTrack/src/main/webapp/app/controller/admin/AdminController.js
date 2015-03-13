Ext.define('TT.controller.admin.AdminController', {
	extend : 'Ext.app.Controller',
	models: ['User', 'Address', 'Phone'],
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
		var User = this.getUserModel();
/*		User.load(2, {
		    success: function(user) {
		        console.log("Loaded user 1: " + user.get('name'));
		        user.userAddresses().each(function(address) {
		            console.log("Address: " + address.get('address1'));
		        });
		        user.set('email', 'user2@example.com');
		        user.save();
		    }
		});*/
		
		var user = Ext.create('TT.model.User', {
			email : '',
			password : '',
			enabled : true,
			name : 'new user'
		});
		
		user.save();
	}
});