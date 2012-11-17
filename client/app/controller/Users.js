Ext.define ('TEWC.controller.Users', {
	extend: 'Ext.app.Controller' ,
	
	views: ['Users'] ,
	
	init: function () {
		this.control ({
			'userlist': {
				itemdblclick: this.pm
			}
		});
	} ,
	
	pm: function (grid, record) {
		if (record.get ('user') !== TEWC.util.Options.username) {
			var rooms = Ext.getCmp('chat').down ('tabpanel[itemId=tpRooms]') ,
			    room = rooms.child ('#user' + record.get ('user'));
		
			if (Ext.isEmpty (room)) {
				var roomDiv = [
					'<div class="room">' ,
						'<div class="room_name">' ,
							'Private chat' ,
						'</div>' ,
						'<div class="room_description">' ,
							'between you and ' + record.get ('user') ,
						'</div>' ,
						'<div class="room_body"></div>' ,
					'</div>'
				].join ('');
			
				room = Ext.create ('TEWC.view.Room', {
					title: record.get ('user') ,
					itemId: 'user' + record.get ('user') ,
					// To distinguish user (PM) and room
					roomType: 'user' ,
					html: roomDiv
				});
			
				rooms.add (room);
			
				rooms.setActiveTab (room);
			}
			else {
				rooms.setActiveTab (room);
			}
		}
	}
});
