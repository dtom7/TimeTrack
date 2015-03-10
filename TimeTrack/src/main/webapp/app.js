Ext.application({
	name : 'TT',
	appFolder : 'app',
	controllers : [ 'main.Main' ],

	launch : function() {

		Ext.create('Ext.container.Viewport', {
			layout : {
				type : 'border',
			},
			items : [ {
				xtype : 'MainNorth'
			}, {
				xtype : 'MainWest'
			}, {
				xtype : 'MainCenter'
			}, {
				xtype : 'MainSouth',
			} ]

		});
	}
});