Ext.define('TT.model.Address', {
	extend : 'Ext.data.Model',
	belongsTo: 'TT.model.User',
	fields : [ {
		name : 'addressType',
		type : 'string'
	}, {
		name : 'address1',
		type : 'string'
	}, {
		name : 'address2',
		type : 'string'
	}, {
		name : 'city',
		type : 'boolean'
	}, {
		name : 'state',
		type : 'string'
	}, {
		name : 'zipCode',
		type : 'string'
	}, {
		name : 'country',
		type : 'string'
	} ]
});