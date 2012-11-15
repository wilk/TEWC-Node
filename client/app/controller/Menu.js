Ext.define ('TEWC.controller.Menu', {
	extend: 'Ext.app.Controller' ,
	
	views: ['Menu'] ,
	
	init: function () {
		this.control ({
			'menunav textfield[itemId=tfLogin]': {
				specialkey: this.login
			}
		});
	} ,
	
	login: function (tf, evt) {
		if (evt.getKey () == evt.ENTER) {
			var opts = TEWC.util.Options, ws = TEWC.util.WebSocket;
			
			opts.username = tf.getValue ();
			
			ws.connect ();
			ws.send ('login', opts.username);
		}
	}
});
