Ext.define('TT.controller.main.Main', {
	extend : 'Ext.app.Controller',
	views : [ 'main.MainNorth', 'main.MainCenter', 'main.MainSouth', 'main.MainWest' ],
	stores : [ 'main.LinksStore' ],
	init : function() {
		this.control({
			'viewport' : {
				render : this.onViewportRender,
				afterrender : this.onViewportAfterRender
			},
			'#west_region > dataview' : {
				itemclick : this.onMainWestDVItemClick
			}
		});
	},

	onViewportRender : function() {
		console.log('Viewport onrender');
	},

	onViewportAfterRender : function() {
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
		// Add instance of MyHome to center region
		var centerRegion = Ext.ComponentQuery.query('#center_region')[0];
		centerRegion.add({
			id : 'My-Home',
			xtype : 'MyHome'
		});
	},

	onMainWestDVItemClick : function(dataview, record) {
		console.log('onMainWestDVItemClick ..');
		var centerRegion = dataview.up('viewport').down('#center_region');
		var itemId = record.get('id');
		console.log('Item Id: ' + itemId);
		if (typeof centerRegion.getComponent(itemId) != 'undefined') {
			console.log('item already added');
		} else {
			console.log('item not yet added');
			centerRegion.add({
				id : itemId,
				xtype : itemId.replace('-', '')
			});
		}
		centerRegion.layout.setActiveItem(itemId);
	}
});