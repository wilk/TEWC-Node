// New declaration from express 2.x to 3.x
// https://github.com/visionmedia/express/wiki/Migrating-from-2.x-to-3.x
var app = require('express') () ,
    http = require ('http') ,
    server = http.createServer (app) ,
    io = require('socket.io').listen (server) ,
    port = 30000;

var RoomFactory = require ('./RoomFactory');

RoomFactory.create ('Plaza', 'Central square discussion');

// Listens on port defined
server.listen (port);

// Handles single socket connection
io.sockets.on ('connection', function (socket) {
	socket.on ('login', function (name) {
		var ul = io.sockets.clients ();
		var found = false;
		
		// Checks if the name already exists
		for (var i in ul) {
			if (ul[i].store.data.name === name) {
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
			socket.set ('name', name);
			socket.set ('rooms', new Array ());
			
			socket.emit ('login',
			{
				'status': true ,
				'roomNameList': RoomFactory.getRoomNameList ()
			});
		}
	});
	
	// room.name and room.message
	socket.on ('public message', function (room) {
//		var ul = RoomFactory.getUserList (room.name, socket.store.id);
		var ul = RoomFactory.getUserList (room.name);
		
		for (var i = 0; i < ul.length; i++) {
			ul[i].emit ('public message', 
			{
				'from': socket.store.data.name ,
				'room': room.name ,
				'message': room.message
			});
		}
	});
	
	// user.name and user.message
	socket.on ('private message', function (user) {
		var ul = io.sockets.clients ();
		
		for (var i in ul) {
			if (ul[i].store.data.name === user.name) {
				ul[i].emit ('private message', {
					'from': socket.store.data.name ,
					'to': user.name ,
					'message': user.message
				});
				
				break;
			}
		}
		
		// ACK the user
		socket.emit ('private message', {
			'from': socket.store.data.name ,
			'to': user.name ,
			'message': user.message
		});
	});
	
	socket.on ('enter room', function (roomName) {
		if (RoomFactory.addUser (socket, socket.store.id, socket.store.data.name, roomName)) {
			// Record the room to the user
			socket.store.data.rooms.push (roomName);
			
			var room = {
				'name': roomName ,
				'description': RoomFactory.getRoomDescription (roomName)
			};
			
			// ACK the user
			socket.emit ('enter room', 
			{
				'type': 'unicast' ,
				'status': true ,
				// room.name and room.description
				'room': room ,
				'userlist': RoomFactory.getUsernameList (roomName)
			});
			
			// Notifies the rest of users, except this one
			socket.broadcast.emit ('enter room', 
			{
				'type': 'anycast' ,
				'room': room.name ,
				'username': socket.store.data.name
			});
		}
		else {
			// NACK the user
			socket.emit ('enter room',
			{
				'type': 'unicast' ,
				'status': false ,
				'room': roomName ,
				'error': 'User already present in this room!'
			});
		}
	});
	
	// room.name and room.description
	socket.on ('create room', function (room) {
		// Check if the room exists
		if (RoomFactory.exists (room.name)) 
			// Sends back a message error if exists
			socket.emit ('create room', 
			{
				'type': 'unicast' ,
				'status': false ,
				'room': room.name ,
				'error': 'Room already exists!'
			});
		// Otherwise creates a new room
		else {
			RoomFactory.create (room.name, room.description);
			
			// ACK to the user
			socket.emit ('create room', 
			{
				'type': 'unicast' ,
				'status': true ,
				'room': room.name
			});
			
			// Notifies the rest of users, except the creator of the room
			socket.broadcast.emit ('create room', 
			{
				'type': 'anycast' ,
				// room.name and room.description
				'room': room ,
				'username': socket.store.data.name
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
});

function exitRoom (roomName, socket) {
	if (RoomFactory.removeUser (socket.store.id, roomName)) {
//		var ul = RoomFactory.getUserList (roomName, socket.store.id);
		var ul = RoomFactory.getUserList (roomName);
		
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
