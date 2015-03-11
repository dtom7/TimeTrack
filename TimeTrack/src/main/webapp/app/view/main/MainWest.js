Ext.define('TT.view.main.MainWest', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.MainWest',

	initComponent : function() {
		console.log('In west');
		Ext.apply(this, {
			region : 'west',
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
				store : 'main.LinksStore',
				tpl : [ '<tpl for=".">', '<li class="list-row">{link}</li>', '</tpl>' ]
			} ]
		});

		this.callParent(arguments);
	}
});