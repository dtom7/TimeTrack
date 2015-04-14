Ext.require('TT.view.common.DataViewField');

Ext.define('TT.view.common.AddressesField', {
    extend: 'TT.view.common.DataViewField',
    alias: 'widget.addressesfield',

    requires: ['TT.view.common.AddressFormWindow'],

    addIconCls: 'add-icon',
    editIconCls: 'edit-icon',
    deleteIconCls: 'delete-icon',
    itemSelector: 'div.address-row',

    addressFormWindow: null,

    initComponent: function() {
    	console.log('In AddressesField initComponent');
        this.tpl = new Ext.XTemplate(
            '<label>', this.fieldLabel, '</label>',
            '<div class="add-icon"/>',
            '<div class="addresses">',
                '<tpl for=".">',
                    '<div class="address-row">',
                        '<div class="address">',
                            '<div>{addressType}</div>',
                            '<div>{address1}</div>',
                            '{[values.address2 ? "<div>" + values.address2 + "</div>" : ""]}',
                            '<div>{city}, {state} {zipCode} {country}</div>',
                        '</div>',
                        '<div class="icons">',
                            '<div class="edit-icon"/>',
                            '<div class="delete-icon"/>',
                        '</div>',
                    '</div>',
                '</tpl>',
            '</div>'
        );

        this.callParent();

        this.on('itemclick', this.onRowClick, this);
    },

    destroy: function() {
        if (this.addressFormWindow) {
            this.killForm();
        }
        this.callParent(arguments);
    },

    onRender: function() {
        this.callParent(arguments);

        this.el.on({
            click: this.onAddClick,
            scope: this,
            delegate: 'div.add-icon'
        });
    },

    onAddClick: function() {
        this.addressFormWindow = Ext.create('TT.view.common.AddressFormWindow', {
            addMode: true,
            listeners: {
                submit: this.onAddAddress,
                cancel: this.onAddressFormCancel,
                scope: this
            }
        });
        this.addressFormWindow.show();
    },

    onRowClick: function(view, record, item, index, e) {
        var targetCls = e.getTarget().className;
        if (targetCls === this.editIconCls) {
            this.onEditClick(view, record);
        } else if (targetCls === this.deleteIconCls) {
            this.onDeleteClick(view, record);
        }
    },

    onEditClick: function(view, model) {
        model.beginEdit();
        this.addressFormWindow = Ext.create('TT.view.common.AddressFormWindow', {
            addMode: false,
            model: model,
            listeners: {
                submit: this.onEditAddress,
                cancel: this.onAddressFormCancel,
                scope: this
            }
        });
        this.addressFormWindow.show();
    },

    onDeleteClick: function(view, model) {
        this.store.remove(model);
        this.refresh();
    },

    onAddressFormCancel: function() {
        this.killForm();
    },

    onAddAddress: function(form, model) {
        this.store.add(model);
        this.killForm();
        this.refresh();
    },

    onEditAddress: function(form, model) {
        model.endEdit();
        this.killForm();
    },

    killForm: function() {
        this.addressFormWindow.destroy();
        this.addressFormWindow = null;
    }
});
