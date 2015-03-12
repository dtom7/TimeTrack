Ext.define('TT.controller.common.CommonController', {
    extend: 'Ext.app.Controller',

    views: [
        'common.MyHome', 'common.MyNotifications', 'common.MyProfile'
    ],

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
    }
});