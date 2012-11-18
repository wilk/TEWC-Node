Ext.define ('TEWC.controller.Menu', {
	extend: 'Ext.app.Controller' ,
	
	views: ['Menu'] ,
	models: ['Users', 'Rooms'] ,
	stores: ['Users', 'Rooms'] ,
	
	init: function () {
		this.control ({
			'menunav textfield[itemId=tfLogin]': {
				specialkey: this.login
			} ,
			'menunav button[itemId=btnLogout]': {
				click: this.logout
			} ,
			'menunav button[itemId=btnNewRoom]': {
				click: this.newRoom
			} ,
			'menunav button[itemId=btnOptions]': {
				click: this.showOptions
			}
		});
	} ,
	
	showOptions: function (btn) {
		Ext.create('TEWC.view.Options').show ();
	} ,
	
	login: function (tf, evt) {
		if (evt.getKey () == evt.ENTER) {
			var opts = TEWC.util.Options, ws = TEWC.util.WebSocket;
			
			opts.username = tf.getValue ();
			
			// TODO: problem with reconnect!
			ws.connect ();
			ws.send ('login', opts.username);
		}
	} ,
	
	logout: function (btn) {
		var menu = btn.up ('menunav');
		
		TEWC.util.WebSocket.close ();
		
		menu.down('textfield[itemId=tfLogin]').setVisible (true);
		menu.down('label[itemId=lblUsername]').setText ('');
		menu.down('button[itemId=btnLogout]').setVisible (false);
		menu.down('button[itemId=btnNewRoom]').setVisible (false);
		menu.down('button[itemId=btnHelp]').setVisible (false);
		menu.down('button[itemId=btnOptions]').setVisible (false);
		
		var tfSend = Ext.getCmp('chat').down ('textfield[itemId=tfSend]');
		
		tfSend.disable ();
		
		this.getUsersStore().removeAll ();
		this.getRoomsStore().removeAll ();
		
		Ext.getCmp('chat').down('tabpanel[itemId=tpRooms]').removeAll ();
	} ,
	
	newRoom: function (btn) {
		Ext.create('TEWC.view.NewRoom').show ();
	}
});
