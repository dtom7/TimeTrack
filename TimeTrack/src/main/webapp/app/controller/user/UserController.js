Ext.define('TT.controller.user.UserController', {
    extend: 'Ext.app.Controller',

    views: [
        'user.MyTimesheets'
    ],

    init: function() {
        this.control({
            '#My-Timesheets': {
            	render: this.onMyHomeRender
            }
        });
    },

    onMyHomeRender: function() {
        console.log('MyTimesheets onrender ...');
    }
});