Ext.application({
	name : 'TT',
	appFolder : 'app',
	controllers : [ 'main.Main', 'common.CommonController',
			'user.UserController', 'admin.AdminController' ],

	launch : function() {
		
        // This override is required to send model associations also to the server
		Ext.override(Ext.data.writer.Json, {
			getRecordData : function(record) {
				var me = this, i, association, childStore, 
				data = this.callParent(arguments);
				/* Iterate over all the hasMany associations */
				for (i = 0; i < record.associations.length; i++) {
					association = record.associations.get(i);
					if (association.type == 'hasMany') {
						data[association.name] = [];
						childStore = eval('record.' + association.name + '()');
						// Iterate over all the children in the current association
						childStore.each(function(childRecord) {
							data[association.name].push(childRecord.getData());
						}, me);
					}
				}
				return data;
			}
		});

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