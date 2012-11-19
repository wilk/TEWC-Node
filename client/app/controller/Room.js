Ext.define ('TEWC.controller.Room', {
	extend: 'Ext.app.Controller' ,
	
	views: ['Room'] ,
	models: ['Rooms', 'Users'] ,
	stores: ['Rooms', 'Users'] ,
	
	init: function () {
		this.control ({
			'room': {
				close: this.exitRoom ,
				show: this.reconfigureUserlist ,
				afterrender: this.resize
			}
		});
	} ,
	
	exitRoom: function (room) {
		var rooms = room.up ('tabpanel[itemId=tpRooms]');
		
		if (rooms.items.length <= 1) this.getUsersStore().removeAll ();
		
		if (room.roomType == 'room') {
			TEWC.util.WebSocket.send ('exit room', room.title);
		}
		else delete TEWC.util.Options.rooms['user' + room.title];
	} ,
	
	resize: function (room) {
		var rooms = room.up ('tabpanel[itemId=tpRooms]') ,
		    height = rooms.getEl().getHeight () - 32 ,
		    divRoom = room.getEl().down ('div[class="room"]');
		
		room.getEl().setHeight (height);
		divRoom.setHeight (height);
		
		this.reconfigureUserlist (room);
	} ,
	
	reconfigureUserlist: function (room) {
		var divRoom = room.getEl().down ('div[class="room"]');
		divRoom.scroll ('b', divRoom.getHeight (true));
		
		var users = this.getUsersStore ();
		users.removeAll ();
		
		if (room.roomType == 'room') {
			Ext.each (TEWC.util.Options.rooms['room' + room.title].userlist, function (user) {
				users.add ({
					user: user
				});
			});
		}
		
		Ext.getCmp('chat').down('textfield[itemId=tfSend]').focus ();
	}
});
