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
		User.load(1, {
		    success: function(user) {
		        console.log("Loaded user 1: " + user.get('name'));
		        user.userAddresses().each(function(address) {
		            console.log("Address: " + address.get('address1'));
		        });
		        //user.userPhones().add({phoneType : 'WORK_PHONE', phoneNumber : '123123'});
		        var phones = user.userPhones();
		        //user.userPhones().splice(0, 1);
		        console.log(phones);
		        user.save();
		    }
		});
		
/*		var user = Ext.create('TT.model.User', {
			email : 'test@test.com',
			password : 'password',
			enabled : true,
			name : 'new user',
			userRoles : ["ROLE_ADMIN","ROLE_USER"]
		});
		user.userPhones().add({phoneType : 'HOME_PHONE', phoneNumber : '123458'});
		console.log('Associated data');
		console.log(user.getAssociatedData());
		user.save();*/
	}
});