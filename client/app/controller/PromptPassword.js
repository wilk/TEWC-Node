Ext.define ('TEWC.controller.PromptPassword', {
	extend: 'Ext.app.Controller' ,
	
	views: ['PromptPassword'] ,
	
	init: function () {
		this.control ({
			'promptpassword': {
				afterrender: this.focusField
			} ,
			'promptpassword textfield[name=password]': {
				specialkey: this.validate
			}
		});
	} ,
	
	focusField: function (win) {
		win.down('textfield[name=password]').focus (false, 100);
	} ,
	
	validate: function (tf, evt) {
		if (evt.getKey () == evt.ENTER) {
			if (tf.isValid ()) {
				var win = tf.up('promptpassword');
				
				TEWC.util.WebSocket.send ('enter room', {
					name: win.roomName ,
					password: tf.getValue ()
				});
				
				win.close ();
			}
		}
	}
});
