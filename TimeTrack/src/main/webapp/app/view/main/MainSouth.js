Ext.define('TT.view.main.MainSouth' ,{
    extend: 'Ext.panel.Panel',
    alias : 'widget.MainSouth',

    initComponent: function() {
    	console.log('In south');
        Ext.apply(this, {
			region : 'south',
			xtype : 'panel',
			height : 20,
			bodyStyle : 'background-color: #214674; color: white;',
			html : ''
		});

        this.callParent(arguments);
    }
});