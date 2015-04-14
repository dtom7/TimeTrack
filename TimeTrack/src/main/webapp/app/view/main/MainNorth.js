Ext.define('TT.view.main.MainNorth' ,{
    extend: 'Ext.panel.Panel',
    alias : 'widget.MainNorth',

    initComponent: function() {
    	console.log('In north');
        Ext.apply(this, {
			region : 'north',			
			margins : '0 0 0 0',
			height : 70,
			tpl : Ext.create('Ext.Template', "<div id='header'><table id='header-table'><tr>", "<td class='td-left-data'>Welcome, {name}</td>", "<td></td>",
	    			"<td class='td-right-data'><button id='logout_btn'>Logout</button></td>", "</tr></table></div>"),
			data : {
				name : 'User' 
			}
		});

        this.callParent(arguments);
    }
});