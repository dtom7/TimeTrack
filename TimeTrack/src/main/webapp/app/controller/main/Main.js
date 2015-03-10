Ext.define('TT.controller.main.Main', {
    extend: 'Ext.app.Controller',
    views: [
            'main.MainNorth',
            'main.MainCenter',
            'main.MainSouth',
            'main.MainWest'
        ],
    init: function() {
        this.control({
            'viewport': {
                render: this.onViewportRender,
                afterrender: this.onViewportAfterRender
            }
        });
    },

    onViewportRender: function() {
        console.log('Viewport onrender');
    },
    
    onViewportAfterRender: function() {
        console.log('Viewport after render');
		Ext.Ajax.request({
			url : 'getUser',
			success : function(response, opts) {
				// Update north region
				console.log("ajax success");
				var obj = Ext.decode(response.responseText);
				Ext.getCmp('north_region').update(obj.userInfo);
				// Update logout button
    				Ext.get('logout_btn').on('click', function(e, t, eOpts) {
					console.log("logout handler");
					Ext.Ajax.request({
						url : 'j_spring_security_logout',
						success : function(response, opts) {
							console.log("ajax success");
							var obj = Ext.decode(response.responseText);
							window.location.assign("login.html");
						},
						failure : function(response, opts) {
							console.log("ajax.failed");
						},
					});
				});
			},
			failure : function(response, opts) {
				console.log("ajax failed");
			},
		});
    }
});