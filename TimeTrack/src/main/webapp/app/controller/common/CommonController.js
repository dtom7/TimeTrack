Ext.define('TT.controller.common.CommonController', {
    extend: 'Ext.app.Controller',
    views: [
        'common.MyHome', 'common.MyNotifications', 'common.MyProfile'
    ],
    refs: [{
        selector: 'viewport > #center_region > #My-Profile',
        ref: 'myProfilePanel',
        autoCreate: true
    }],
    init: function() {
        this.control({
            '#My-Home': {
            	render: this.onMyHomeRender
            }
        });
        
        this.application.on({
        	MyProfileEvent: this.onMyProfileEvent,
            scope: this
        });
    },

    onMyHomeRender: function() {
        console.log('MyHome onrender ...');
    },
    
    onMyProfileEvent: function() {
        console.log('MyProfileEvent ... ');
		var User = this.application.getUserModel();
		var mainController = this.application.getController('main.MainController');
		var me = this;
		console.log('id: ' + mainController.currentUserId);
		User.load(mainController.currentUserId, {
		    success: function(user) {
		        console.log("Loaded user: " + user.get('name'));
		        me.getMyProfilePanel().model = user;
		        me.getMyProfilePanel().loadRecord(user);

		    }
		});
    }
});