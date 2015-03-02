Ext.onReady(function() {
	
	Ext.form.field.VTypes.emailText = 'Please enter a valid e-mail id';

	var fpItems = [ {
		fieldLabel : 'Email ID',
		name : 'j_username',
		allowBlank : false,
		vtype: 'email',
		blankText: 'Email ID cannot be blank'
	}, {
		fieldLabel : 'Password',
		name : 'j_password',
		allowBlank : false,
		inputType : 'password',
		blankText: 'Password cannot be blank'
	} ];

	var fp = Ext.create('Ext.form.Panel', {
		renderTo : Ext.getBody(),
		width : 400,
		height : 160,
		title : 'Authenticate',
		frame : true,
		bodyStyle : 'padding: 6px',
		labelWidth : 126,
		defaultType : 'textfield',
		defaults : {
			msgTarget : 'side',
			anchor : '-10'
		},
		items : fpItems,
		buttons : [ {
			text : 'Submit',
		        handler: function() {
		            // The getForm() method returns the Ext.form.Basic instance:
		            var form = this.up('form').getForm();
		            if (form.isValid()) {
		                // Submit the Ajax request and handle the response
		                form.submit({
		                	url : 'j_spring_security_check',
		                    success: function(form, action) {
		                    	console.log('ajax success');
		                    	if (action.result.msg === 'Login Success') {
		                    		window.location.assign("/TimeTrack");
		                    	} else {
		                    		Ext.Msg.alert('Login Failed', action.result.msg);
		                    	}                                              
		                    },
		                    failure: function(form, action) {
		                    	console.log('ajax failed');
		                        Ext.Msg.alert('Failed', action.result ? action.result.msg : 'No response');
		                    }
		                });
		            }
		        }
		}, {
			text : 'Reset',
			handler: function() {
			var form = this.up('form').getForm();
			form.reset();
			}
		} ]

	});
	
	fp.center();

});
