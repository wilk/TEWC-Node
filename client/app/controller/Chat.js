Ext.define ('TEWC.controller.Chat', {
	extend: 'Ext.app.Controller' ,
	
	views: ['Chat'] ,
	models: ['Users'] ,
	stores: ['Users'] ,
	
	init: function () {
		this.control ({
			'chat textfield[itemId=tfSend]': {
				specialkey: this.send
			} ,
			'chat tabpanel[itemId=tpRooms]': {
				tabchange: this.reconfigureUserlist
			}
		});
	} ,
	
	send: function (tf, evt) {
		if (evt.getKey () == evt.ENTER) {
			var msg = tf.getValue ();
		
			if (!Ext.isEmpty (msg)) {
				var ws = TEWC.util.WebSocket ,
				    rooms = tf.up('chat').down ('tabpanel[itemId=tpRooms]') ,
				    room = rooms.getActiveTab ();
			
				if (room.roomType == 'room') {
					ws.send ('public message', {
						name: room.title ,
						message: msg
					});
				}
				else {
					// TODO: handle PM
				}
			
				tf.reset ();
			}
		}
	} ,
	
	reconfigureUserlist: function (tp, room) {
		if (room.roomType == 'room') {
			var users = this.getUsersStore ();
			
			users.removeAll ();
			
			Ext.each (TEWC.util.Options.rooms[room.title], function (user) {
				users.add ({
					user: user
				});
			});
		}
	}
});
