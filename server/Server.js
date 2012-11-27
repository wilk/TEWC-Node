var RoomFactory = require ('./RoomFactory') ,
    fs = require ('fs') ,
    cf = fs.readFileSync ('../config.json', 'utf-8') ,
    config = JSON.parse (cf) ,
    io = require('socket.io').listen (config.port);

// Handles single socket connection
io.sockets.on ('connection', function (socket) {
	socket.on ('login', function (user) {
		var ul = io.sockets.clients ();
		var found = false;
		
		// Checks if the name already exists
		for (var i in ul) {
			if (ul[i].store.data.name === user.name) {
				found = true;
				break;
			}
		}
		
		// If yes, notifies the user with an error
		if (found) {
			socket.emit ('login', 
			{
				'status': false ,
				'error': 'Your nickname already exists! Choose another one.'
			});
		}
		// Otherwise, sets socket vars
		else {
			socket.set ('name', user.name);
			socket.set ('color', user.color);
			socket.set ('rooms', new Array ());
			
			socket.emit ('login',
			{
				'status': true ,
				'rooms': RoomFactory.getRoomsList ()
			});
		}
	});
	
	// room.name and room.message
	socket.on ('public message', function (room) {
		var ul = RoomFactory.getUserList (room.name);
		
		for (var i = 0; i < ul.length; i++) {
			ul[i].emit ('public message', 
			{
				'from': socket.store.data.name ,
				'color': socket.store.data.color ,
				'room': room.name ,
				'message': room.message ,
				'timestamp': new Date ()
			});
		}
	});
	
	// user.name and user.message
	socket.on ('private message', function (user) {
		var ul = io.sockets.clients ();
		
		for (var i in ul) {
			if (ul[i].store.data.name === user.to) {
				ul[i].emit ('private message', {
					'type': 'anycast' ,
					'from': socket.store.data.name ,
					'color': socket.store.data.color ,
					'to': user.to ,
					'message': user.message ,
					'timestamp': new Date ()
				});
				
				break;
			}
		}
		
		// ACK the user
		socket.emit ('private message', {
			'type': 'unicast' ,
			'from': socket.store.data.name ,
			'color': socket.store.data.color ,
			'to': user.to ,
			'message': user.message ,
			'timestamp': new Date ()
		});
	});
	
	socket.on ('enter room', function (room) {
		var allowed = false;
		
		if (RoomFactory.protected (room.name)) {
			if (RoomFactory.validate (room.name, room.password)) allowed = true;
		}
		else allowed = true;
		
		if (allowed) {
			if (RoomFactory.addUser (socket, socket.store.id, socket.store.data.name, room.name)) {
				// Record the room to the user
				socket.store.data.rooms.push (room.name);
			
				var room2send = {
					'name': room.name ,
					'description': RoomFactory.getRoomDescription (room.name)
				};
				
				// ACK the user
				socket.emit ('enter room', 
				{
					'type': 'unicast' ,
					'status': true ,
					// room.name and room.description
					'room': room2send ,
					'userlist': RoomFactory.getUsernameList (room.name)
				});
			
				// Notifies the rest of users, except this one
				var ul = RoomFactory.getUserList (room.name);
		
				// Notifies the rest of users of that room
				for (var i in ul) {
					if (ul[i] !== socket) {
						ul[i].emit ('enter room', 
						{
							'type': 'anycast' ,
							'room': room.name ,
							'user': socket.store.data.name
						});
					}
				}
			}
			else {
				// NACK the user
				socket.emit ('enter room',
				{
					'type': 'unicast' ,
					'status': false ,
					'room': room.name ,
					'error': 'User already present in this room!'
				});
			}
		}
		else {
			// NACK the user
			socket.emit ('enter room',
			{
				'type': 'unicast' ,
				'status': false ,
				'room': room.name ,
				'error': 'Wrong password!'
			});
		}
	});
	
	// room.name and room.description
	socket.on ('create room', function (room) {
		// Check if the room exists
		if (RoomFactory.exists (room.name)) {
			// Sends back a message error if exists
			socket.emit ('create room', 
			{
				'type': 'unicast' ,
				'status': false ,
				'room': room.name ,
				'error': 'Room already exists!'
			});
		}
		// Otherwise creates a new room
		else {
			RoomFactory.create (room);
			
			// ACK to the user
			socket.emit ('create room', 
			{
				'type': 'unicast' ,
				'status': true ,
				'room': room.name ,
				'protected': room.protected
			});
			
			// Notifies the rest of users, except the creator of the room
			socket.broadcast.emit ('create room', 
			{
				'type': 'anycast' ,
				'room': room.name ,
				'protected': room.protected
			});
		}
	});
	
	socket.on ('exit room', function (roomName) {
		exitRoom (roomName, socket);
	});
	
	socket.on ('disconnect', function () {
		var rl = socket.store.data.rooms;
		// Removes the user from each room that belongs to
		for (var i in rl) exitRoom (rl[i], socket);
	});
	
	socket.on ('change color', function (color) {
		socket.store.data.color = color;
	});
});

function exitRoom (roomName, socket) {
	if (RoomFactory.removeUser (socket.store.id, roomName)) {
		var ul = RoomFactory.getUserList (roomName);
		
		if (ul.length === 0) {
			io.sockets.emit ('destroy room', 
			{
				'room': roomName
			});
		}
		else {
			// Notifies the rest of users of that room
			for (var i in ul) {
				ul[i].emit ('exit room', 
				{
					'type': 'anycast' ,
					'room': roomName ,
					'user': socket.store.data.name
				});
			}
		}
	}
	else {
		// Otherwise NACK the user
		socket.emit ('exit room', 
		{
			'type': 'unicast' ,
			'status': false ,
			'room': roomName ,
			'error': 'You don\'t belong to this room or something goes wrong during the remove.'
		});
	}
}
