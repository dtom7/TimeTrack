Ext.define('TT.view.main.MainCenter' ,{
    extend: 'Ext.panel.Panel',
    alias : 'widget.MainCenter',

    initComponent: function() {
    	console.log('In center');
        Ext.apply(this, {
			region : 'center',			
			activeItem : 0,
			layout : {
				type : 'card',
				deferredRender : true,
			}
		});

        this.callParent(arguments);
    }
});