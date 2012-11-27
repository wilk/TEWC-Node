Ext.define ('TEWC.util.WebSocket', {
	singleton: true ,
	ws: null ,
	
	connect: function () {
		var opts = TEWC.util.Options;
		
		if (Ext.isEmpty (this.ws)) {
			this.ws = io.connect (opts.baseURI + ':' + opts.port);
			this.handle ();
		}
		else this.ws.socket.reconnect ();
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
				
				Ext.each (res.rooms, function (room) {
					rooms.add ({
						room: room.name ,
						protected: room.protected
					});
					
					opts.rooms['room' + room.name] = {
						userlist: [] ,
						tab: null
					};
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
						opts.rooms['room' + res.room.name].userlist.push (user);
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
					
					var room = Ext.create ('TEWC.view.Room', {
						title: res.room.name ,
						itemId: 'room' + res.room.name ,
						// To distinguish user (PM) and room
						roomType: 'room' ,
						html: roomDiv
					});
					
					rooms.add (room);
					opts.rooms['room' + res.room.name].tab = room;
					
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
				opts.rooms['room' + res.room].userlist.push (res.user);
				
				var rooms = Ext.getCmp('chat').down ('tabpanel[itemId=tpRooms]') ,
				    room = Ext.isEmpty (opts.rooms['room' + res.room]) ? null : opts.rooms['room' + res.room].tab ,
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
			    room = Ext.isEmpty (opts.rooms['room' + res.room]) ? null : opts.rooms['room' + res.room].tab ,
			    divRoom = room.getEl().down ('div[class="room"]') ,
			    body = room.getEl().down ('div[class="room_body"]') ,
    			    ts = Ext.isEmpty (opts.msgDateFormat) ? '' : '[' + Ext.Date.format (new Date (res.timestamp), opts.msgDateFormat) + ']';
			
			opts.msgTemplate.append (body, {
				timestamp: ts ,
				user: res.from ,
				color: res.color ,
				msg: res.message
			});

			divRoom.scroll ('b', divRoom.getHeight (true));
		});
		
		me.ws.on ('private message', function (res) {
			var rooms = Ext.getCmp('chat').down ('tabpanel[itemId=tpRooms]') ,
			    username = res.type === 'unicast' ? res.to : res.from ,
			    room = Ext.isEmpty (opts.rooms['user' + username]) ? null : opts.rooms['user' + username].tab;
			
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
				opts.rooms['user' + username] = {
					tab: room
				};
				
				// Renders the room
				var r = rooms.getActiveTab ();
				rooms.setActiveTab (room);
				rooms.setActiveTab (r);
			}
			
			if (rooms.getActiveTab () != room) {
				// TODO: highlight the tab
			}
			
			var body = room.getEl().down ('div[class="room_body"]') ,
			    divRoom = room.getEl().down ('div[class="room"]') ,
			    ts = Ext.isEmpty (opts.msgDateFormat) ? '' : '[' + Ext.Date.format (new Date (res.timestamp), opts.msgDateFormat) + ']';
			
			opts.msgTemplate.append (body, {
				timestamp: ts ,
				user: res.from ,
				color: res.color ,
				msg: res.message
			});

			divRoom.scroll ('b', divRoom.getHeight (true));
		});
		
		me.ws.on ('create room', function (res) {
			var rooms = Ext.data.StoreManager.lookup ('Rooms');
			
			if (res.type === 'unicast') {
				if (res.status) {
					rooms.add ({
						room: res.room ,
						protected: res.protected
					});
					
					opts.rooms['room' + res.room] = {
						userlist: [] ,
						tab: null
					};
					
					me.send ('enter room', {
						name: res.room ,
						password: res.protected ? opts.lastCreatedRoomPassword : ''
					});
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
					room: res.room ,
					protected: res.protected
				});
				
				opts.rooms['room' + res.room] = {
					userlist: [] ,
					tab: null
				};
			}
		});
		
		me.ws.on ('exit room', function (res) {
			if (res.type === 'anycast') {
				Ext.each (opts.rooms['room' + res.room].userlist, function (user, index) {
					if (user === res.user) {
						opts.rooms['room' + res.room].userlist.splice (index, 1);
						return false;
					}
				});
				
				var rooms = Ext.getCmp('chat').down ('tabpanel[itemId=tpRooms]') ,
				    room;
				
				Ext.each (rooms.items.items, function (tab) {
					if (tab.itemId === 'room' + res.room) {
						room = tab;
						return false;
					}
				});
				
				var divRoom = room.getEl().down ('div[class="room"]') ,
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
			
			delete opts.rooms['room' + res.room];
		});
		
		me.ws.on ('disconnect', function (res) {
			if (!opts.normalDisconnection) {
				opts.globalApp.getController('Menu').logout ();
				
				Ext.Msg.show ({
					title: 'Connection closed!' ,
					msg: 'Damn! Connection closed by the server.' ,
					icon: Ext.Msg.ERROR ,
					buttons: Ext.Msg.OK
				});
			}
		});
	} ,
	
	send: function (event, data) {
		this.ws.emit (event, data);
	}
});
