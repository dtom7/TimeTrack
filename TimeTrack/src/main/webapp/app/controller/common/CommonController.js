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
    },

    onMyHomeRender: function() {
        console.log('MyHome onrender ...');
    }
});