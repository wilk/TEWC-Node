Ext.define ('TEWC.controller.Menu', {
	extend: 'Ext.app.Controller' ,
	
	views: ['Menu'] ,
	models: ['Users', 'Rooms', 'Options'] ,
	stores: ['Users', 'Rooms', 'Options'] ,
	
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
			} ,
			'menunav button[itemId=btnHelp]': {
				click: this.showHelp
			}
		});
	} ,
	
	showHelp: function (btn) {
		Ext.create('TEWC.view.Help').show ();
	} ,
	
	showOptions: function (btn) {
		Ext.create('TEWC.view.Options').show ();
	} ,
	
	login: function (tf, evt) {
		if (evt.getKey () == evt.ENTER) {
			tf.setValue (tf.getValue().trim ());
			
			if (tf.isValid ()) {
				Ext.getCmp('viewportPage').setLoading ('Wait a moment during login...');
				
				var opts = TEWC.util.Options ,
				    ws = TEWC.util.WebSocket ,
				    optsStore = this.getOptionsStore () ,
				    optsModel = optsStore.first ();
				
				opts.username = tf.getValue ();
				
				if (Ext.isEmpty (optsModel)) optsStore.add ({username: opts.username});
				else optsModel.set ({username: opts.username});
				
				optsStore.sync ();
				
				ws.connect ();
				ws.send ('login', {
					name: opts.username ,
					color: opts.color
				});
				
				opts.normalDisconnection = false;
			}
			else tf.markInvalid ();
		}
	} ,
	
	logout: function (btn) {
		var menu = Ext.getCmp ('menuNav');
		
		TEWC.util.Options.normalDisconnection = true;
		
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
		
		menu.down('textfield[itemId=tfLogin]').focus ();
	} ,
	
	newRoom: function (btn) {
		Ext.create('TEWC.view.NewRoom').show ();
	}
});
