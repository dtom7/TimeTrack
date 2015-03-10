Ext.define('TT.view.main.MainCenter' ,{
    extend: 'Ext.panel.Panel',
    alias : 'widget.MainCenter',

    initComponent: function() {
    	console.log('In center');
        Ext.apply(this, {
			region : 'center',
			id : 'center_region',
			activeItem : 0,
			layout : {
				type : 'card',
				deferredRender : true,
			},
			items : [ {
				id : 'My-Home',
				xtype : 'panel',
				html : 'Center'
			} ]
		});

        this.callParent(arguments);
    }
});