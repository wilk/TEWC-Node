Ext.define ('TEWC.controller.Chat', {
	extend: 'Ext.app.Controller' ,
	
	views: ['Chat'] ,
	
	init: function () {
		this.control ({
			'chat textfield[itemId=tfSend]': {
				specialkey: this.send
			}
		});
	} ,
	
	send: function (tf, evt) {
		if (evt.getKey () == evt.ENTER) {
			var msg = tf.getValue().trim () ,
			    rooms = tf.up('chat').down ('tabpanel[itemId=tpRooms]');
		
			if (!Ext.isEmpty (msg) && (rooms.items.length > 0)) {
				var ws = TEWC.util.WebSocket ,
				    room = rooms.getActiveTab ();
				
				msg = Ext.String.htmlEncode (msg);
				
				if (room.roomType == 'room') {
					ws.send ('public message', {
						name: room.title ,
						message: msg
					});
				}
				else {
					ws.send ('private message', {
						to: room.title ,
						message: msg
					});
				}
			
				tf.reset ();
			}
		}
	}
});
