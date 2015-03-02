Ext.onReady(function() {

	var headertpl = Ext.create('Ext.Template', "<div id='header'><table><tr>", "<td class='td-left-data'>Welcome, {name}</td>", "<td></td>",
			"<td class='td-right-data'><button id='logout_btn'>Logout</button></td>", "</tr></table></div>");
	headertpl.compile();

	var win = Ext.create('Ext.container.Viewport', {
		layout : {
			type : 'border',
		},
		items : [ {
			region : 'north',
			id : 'north_region',
			margins : '0 0 0 0',
			height : 70,
			tpl : headertpl,
			data : {
				name : 'User'
			}
		// html : "<div id='header'></div>"
		}, {
			region : 'center',
			xtype : 'tabpanel',
			items : [

			]
		}, {
			region : 'south',
			xtype : 'panel',
			height : 20,
			html : 'Southern Stuff here'
		} ],
		listeners : {

			render : function() {
				console.log("render");
			},

			afterrender : function() {
				console.log("afterrender");

				Ext.Ajax.request({
					url : 'getUser',
					success : function(response, opts) {
						console.log("ajax success");
						var obj = Ext.decode(response.responseText);
						// Populate the logged
						// in user name
						Ext.getCmp('north_region').update(obj.user);
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

				// Populate the navigation list
			}
		}
	}).show();

});
