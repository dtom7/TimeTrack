Ext.require('TT.app.view.MyHome');
Ext.require('TT.app.view.MyProfile');
Ext.require('TT.app.view.MyNotifications');
Ext.require('TT.app.view.ManageUsers');
Ext.require('TT.app.view.ManageProjects');
Ext.require('TT.app.view.ManageClients');
Ext.require('TT.app.view.ApproveTimesheets');
Ext.require('TT.app.view.MyTimesheets');

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
		}, {
			region : 'west',
			id : 'west_region',
			xtype : 'panel',
			width : 200,
			bodyStyle : 'background-color: #cbdbef;',
			layout : 'fit',
			items : [ {
				xtype : 'dataview',
				cls : 'nav-box',
				autoEl : 'ul',
				itemSelector : '.list-row',
				overItemCls : 'list-row-over',
				simpleSelect : true,
				store : Ext.create('Ext.data.Store', {
					autoLoad : true,
					fields : [ {
						name : 'link',
						type : 'string'
					}, {
						name : 'id',
						type : 'string'
					} ],
					proxy : {
						type : 'ajax',
						url : 'getLinks',
						reader : {
							type : 'json',
							root : 'data'
						}
					}
				}),

				tpl : [ '<tpl for=".">', '<li class="list-row">{link}</li>', '</tpl>' ],
				listeners : {
					itemclick : function(dataview, record) {
						var centerRegion = this.up('viewport').down('#center_region');
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
				}
			} ]
		}, {
			region : 'center',
			id : 'center_region',
			xtype : 'panel',
			activeItem : 0,
			layout : {
				type : 'card',
				deferredRender : true,
			},
			items : [ {
				id : 'My-Home',
				xtype : 'MyHome'
			} ]
		}, {
			region : 'south',
			id : 'south_region',
			xtype : 'panel',
			height : 20,
			bodyStyle : 'background-color: #214674; color: white;',
			html : ''
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
		}
	}).show();

});
