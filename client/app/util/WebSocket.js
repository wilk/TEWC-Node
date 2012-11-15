Ext.define ('TEWC.util.WebSocket', {
	singleton: true ,
	ws: null ,
	
	connect: function () {
		var opts = TEWC.util.Options;
		this.ws = io.connect (opts.baseURI + ':' + opts.port);
		this.handle ();
	} ,
	
	handle: function () {
		var opts = TEWC.util.Options;
		var me = this;
		
		me.ws.on ('login', function (res) {
			if (res.status) {
				// Loads the rooms store
				var rooms = Ext.data.StoreManager.lookup ('Rooms');
				
				Ext.each (res.roomNameList, function (room) {
					rooms.add ({
						room: room
					});
					
					opts.rooms[room] = [];
				});
				
				// Updates the menu
				var menu = Ext.getCmp ('menuNav');
				
				menu.down('textfield[itemId=tfLogin]').setVisible (false);
				menu.down('label[itemId=lblUsername]').setText (opts.username);
				menu.down('button[itemId=btnLogout]').setVisible (true);
				menu.down('button[itemId=btnNewRoom]').setVisible (true);
				
				var tfSend = Ext.getCmp('chat').down ('textfield[itemId=tfSend]');
				
				tfSend.enable ();
				tfSend.focus ();
				
				// Enters Plaza room
				me.send ('enter room', 'Plaza');
			}
			else {
				Ext.Msg.show ({
					title: 'Error!' ,
					msg: [
						'An error occurred during login!<br/>' ,
						'Server response is:<br/>' ,
						res.error
					].join ('') ,
					icon: Ext.Msg.ERROR ,
					buttons: Ext.Msg.OK
				});
			}
		});
		
		me.ws.on ('enter room', function (res) {
			if (res.type === 'unicast') {
				if (res.status) {
					Ext.each (res.userlist, function (user) {
						opts.rooms[res.room.name].push (user);
					});
					
					var rooms = Ext.getCmp('chat').down ('tabpanel[itemId=tpRooms]');
					
					var roomDiv = [
						'<div class="room">' ,
							'<div class="room_name">' ,
								res.room.name ,
							'</div>' ,
							'<div class="room_description">' ,
								res.room.description ,
							'</div>' ,
							'<div class="room_body"></div>' ,
						'</div>'
					].join ('');
					
					// TODO: to add messages: 
					// 	var body = room.getEl().down ('div[class="room_body"]');
					//	body.setHTML (body.getHTML () + msg + '<br/>');
					//	or : body.insertHtml ('beforeEnd', '<p>' + msg + '</p>');
					var room = rooms.add ({
						title: res.room.name ,
						itemId: 'room' + res.room.name ,
						// To distinguish user (PM) and room
						roomType: 'room' ,
						html: roomDiv ,
						closable: true
					});
					
					rooms.setActiveTab (room);
				}
				else {
					Ext.Msg.show ({
						title: 'Error!' ,
						msg: [
							'An error occurred during the operation!<br/>' ,
							'Server response is:<br/>' ,
							res.error
						].join ('') ,
						icon: Ext.Msg.ERROR ,
						buttons: Ext.Msg.OK
					});
				}
			}
			else {
				// TODO: handle anycast
			}
		});
		
		me.ws.on ('public message', function (res) {
			var rooms = Ext.getCmp('chat').down ('tabpanel[itemId=tpRooms]') ,
			    room = rooms.child ('#room' + res.room) ,
			    body = room.getEl().down ('div[class="room_body"]') ,
			    user = '<b>' + res.from + '</b>';
			
			body.insertHtml ('beforeEnd', '<p>' + user + ': ' + res.message + '</p>');
		});
	} ,
	
	send: function (event, data) {
		this.ws.emit (event, data);
	}
});
