Ext.require('TT.view.common.FormPanel');
//Ext.require('TT.view.common.AddressesField');

Ext.define('TT.view.common.MyProfile', {
	extend : 'TT.view.common.FormPanel',
	alias : 'widget.MyProfile',
	requires: ['TT.view.common.AddressesField'],
	
	title : 'My Profile',
	frame : false,
	bodyPadding : 10,
	autoScroll : true,
	initComponent : function() {
		console.log('In MyProfile initComponent');
		Ext.apply(this, {
			items : [ {
				xtype : 'panel',
				frame : true,
				bodyPadding : 10,
				width : 550,
				items : [ {
					xtype : 'fieldset',
					title : 'Login Info',
					defaultType : 'textfield',
					width : 500,
					fieldDefaults : {
						labelAlign : 'left',
						labelStyle : 'padding-bottom: 5px;',
						msgTarget : 'under'
					},
					defaults : {
						anchor : '100%'
					},
					items : [ {
						allowBlank : false,
						fieldLabel : 'Email ID',
						name : 'email',
						vtype : 'email'
					}, {
						allowBlank : false,
						fieldLabel : 'Password',
						name : 'password',
						inputType : 'password'
					}, {
						allowBlank : false,
						fieldLabel : 'Confirm password',
						name : 'password',
						inputType : 'password'
					} , {
			             xtype: 'addressesfield',
			             id: 'address-field',
			             name: 'userAddresses',
			             fieldLabel: 'Addresses'
			         }]
				} ],

				buttons : [ {
					text : 'Save'
				}, {
					text : 'Cancel'
				}, '->' ]
			} ],
		});

		this.callParent();
	},

});