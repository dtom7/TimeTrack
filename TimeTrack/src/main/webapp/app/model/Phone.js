Ext.define('TT.model.Phone', {
	extend : 'Ext.data.Model',
	belongsTo: 'TT.model.User',
	fields : [ {
		name : 'phoneType',
		type : 'string'
	}, {
		name : 'phoneNumber',
		type : 'string'
	} ]
});