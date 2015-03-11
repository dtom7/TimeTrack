Ext.define('TT.store.main.LinksStore', {
	extend : 'Ext.data.Store',
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
});