Ext.define('TT.model.User', {
	extend : 'Ext.data.Model',
	requires : [ 'TT.model.Address', 'TT.model.Phone' ],
	idProperty : 'id',
	fields : [ {
		name : 'id',
		type : 'int'
	}, {
		name : 'email',
		type : 'string'
	}, {
		name : 'password',
		type : 'string'
	}, {
		name : 'enabled',
		type : 'boolean'
	}, {
		name : 'name',
		type : 'string'
	}, {
		name : 'version',
		type : 'int'
	}, {
		name : 'userRoles',
		type : 'auto'
	} ],
	associations : [ {
		type  : 'hasMany',
		model : 'TT.model.Address',
		name : 'userAddresses',
		associationKey : 'userAddresses'
	}, {
		type  : 'hasMany',
		model : 'TT.model.Phone',
		name : 'userPhones',
		associationKey : 'userPhones'
	} ],
    proxy: {
        type: 'rest',
        url : 'users',
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});