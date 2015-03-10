Ext.define('TT.view.main.MainWest' ,{
    extend: 'Ext.panel.Panel',
    alias : 'widget.MainWest',

    initComponent: function() {
    	console.log('In west');
        Ext.apply(this, {
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

				tpl : [ '<tpl for=".">', '<li class="list-row">{link}</li>', '</tpl>' ]
			} ]
		});

        this.callParent(arguments);
    }
});