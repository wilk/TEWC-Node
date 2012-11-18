Ext.define ('TEWC.util.WebSocket', {
	singleton: true ,
	ws: null ,
	
	connect: function () {
		var opts = TEWC.util.Options;
		this.ws = io.connect (opts.baseURI + ':' + opts.port);
		this.handle ();
	} ,
	
	close: function () {
		this.ws.disconnect ();
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
				menu.down('button[itemId=btnHelp]').setVisible (true);
				menu.down('button[itemId=btnOptions]').setVisible (true);
				
				var tfSend = Ext.getCmp('chat').down ('textfield[itemId=tfSend]');
				
				tfSend.enable ();
				tfSend.focus ();
				
				// Enters Plaza room
//				me.send ('enter room', 'Plaza');
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
//					opts.rooms[res.room.name] = opts.rooms[res.room.name] || [];
					opts.rooms[res.room.name] = [];
					
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
					var room = Ext.create ('TEWC.view.Room', {
						title: res.room.name ,
						itemId: 'room' + res.room.name ,
						// To distinguish user (PM) and room
						roomType: 'room' ,
						html: roomDiv
					});
					
					rooms.add (room);
					
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
				opts.rooms[res.room].push (res.user);
				
				var rooms = Ext.getCmp('chat').down ('tabpanel[itemId=tpRooms]') ,
				    room = rooms.child ('#room' + res.room) ,
				    divRoom = room.getEl().down ('div[class="room"]') ,
				    body = room.getEl().down ('div[class="room_body"]');
				
				// If the room where the user is chatting, updates the users store
				if (rooms.getActiveTab().title == res.room) {
					var users = Ext.data.StoreManager.lookup ('Users');
					
					users.add ({
						user: res.user
					});
				}
				
				body.insertHtml ('beforeEnd', '<p class="room_enter_user">' + res.user + ' is just arrived!</p>');
				divRoom.scroll ('b', divRoom.getHeight (true));
			}
		});
		
		me.ws.on ('public message', function (res) {
			var rooms = Ext.getCmp('chat').down ('tabpanel[itemId=tpRooms]') ,
			    room = rooms.child ('#room' + res.room) ,
			    divRoom = room.getEl().down ('div[class="room"]') ,
			    body = room.getEl().down ('div[class="room_body"]') ,
			    ts = Ext.isEmpty (opts.msgDateFormat) ? '' : '[<span class="timestamp">' + Ext.Date.format (new Date (res.timestamp), opts.msgDateFormat) + '</span>] ' ,
			    user = '<b>' + ts + res.from + '</b>';
			
			body.insertHtml ('beforeEnd', '<p>' + user + ': ' + res.message + '</p>');
			divRoom.scroll ('b', divRoom.getHeight (true));
		});
		
		me.ws.on ('private message', function (res) {
			var rooms = Ext.getCmp('chat').down ('tabpanel[itemId=tpRooms]');
			var username;
			
			if (res.type === 'unicast') username = res.to;
			else username = res.from;
			
			var room = rooms.child ('#user' + username);
			
			if (Ext.isEmpty (room)) {
				var roomDiv = [
					'<div class="room">' ,
						'<div class="room_name">' ,
							'Private chat' ,
						'</div>' ,
						'<div class="room_description">' ,
							'between you and ' + username ,
						'</div>' ,
						'<div class="room_body"></div>' ,
					'</div>'
				].join ('');
				
				room = Ext.create ('TEWC.view.Room', {
					title: username ,
					itemId: 'user' + username ,
					// To distinguish user (PM) and room
					roomType: 'user' ,
					html: roomDiv
				});
			
				rooms.add (room);
				
				// Renders the room
				var r = rooms.getActiveTab ();
				rooms.setActiveTab (room);
				rooms.setActiveTab (r);
				
				// TODO: highlight new tab
			}
			
			var body = room.getEl().down ('div[class="room_body"]') ,
			    divRoom = room.getEl().down ('div[class="room"]') ,
			    ts = Ext.isEmpty (opts.msgDateFormat) ? '' : '[<span class="timestamp">' + Ext.Date.format (new Date (res.timestamp), opts.msgDateFormat) + '</span>] ' ,
			    user = '<b>' + ts + res.from + '</b>';
			
			body.insertHtml ('beforeEnd', '<p>' + user + ': ' + res.message + '</p>');
			divRoom.scroll ('b', divRoom.getHeight (true));
		});
		
		me.ws.on ('create room', function (res) {
			var rooms = Ext.data.StoreManager.lookup ('Rooms');
			
			if (res.type === 'unicast') {
				if (res.status) {
					rooms.add ({
						room: res.room
					});
					
					me.send ('enter room', res.room);
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
				rooms.add ({
					room: res.room
				});
			}
		});
		
		me.ws.on ('exit room', function (res) {
			if (res.type === 'anycast') {
				Ext.each (opts.rooms[res.room], function (user, index) {
					if (user === res.user) {
						opts.rooms[res.room].splice (index, 1);
						return false;
					}
				});
				
				var rooms = Ext.getCmp('chat').down ('tabpanel[itemId=tpRooms]') ,
				    room = rooms.child ('#room' + res.room) ,
				    divRoom = room.getEl().down ('div[class="room"]') ,
				    body = room.getEl().down ('div[class="room_body"]');
				
				// If it's the room where the user is chatting, updates the users store
				if (rooms.getActiveTab().title == res.room) {
					var users = Ext.data.StoreManager.lookup ('Users');
					
					users.removeAt (users.find ('user', res.user));
				}
				
				body.insertHtml ('beforeEnd', '<p class="room_exit_user">' + res.user + ' has left the room!</p>');
				divRoom.scroll ('b', divRoom.getHeight (true));
			}
		});
		
		me.ws.on ('destroy room', function (res) {
			var rooms = Ext.data.StoreManager.lookup ('Rooms');
			rooms.removeAt (rooms.find ('room', res.room));
			
			delete opts.rooms[res.room];
		});
	} ,
	
	send: function (event, data) {
		this.ws.emit (event, data);
	}
});
