Ext.application({
	name : 'TT',
	appFolder : 'app',
	controllers : [ 'main.Main', 'common.CommonController', 'user.UserController', 'admin.AdminController' ],

	launch : function() {

		Ext.create('Ext.container.Viewport', {
			layout : {
				type : 'border',
			},
			items : [ {
				xtype : 'MainNorth',
				id : 'north_region'
			}, {
				xtype : 'MainWest',
				id : 'west_region'
			}, {
				xtype : 'MainCenter',
				id : 'center_region'
			}, {
				xtype : 'MainSouth',
				id : 'south_region'
			} ]

		});
	}
});