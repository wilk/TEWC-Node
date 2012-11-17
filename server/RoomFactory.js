// You can keep some useful infos about the users created
module.exports = RoomFactory = (function () {
	var Room = require ('./Room');
	this.counter = 0;
	this.rooms = new Object ();
	
	// Sends a message to each users registered
	this.sendMessage = function (msg) {
		if (typeof this.rooms !== 'undefined') {
			for (index in this.rooms) this.rooms[index].displayMsg (msg);
		}
	}
	
	// Returns a new user, before registering it
	this.create = function (name, description, users) {
		var toReturn = new Room (name, description, users);
		
		this.counter++;
		this.rooms[name.toLowerCase ()] = toReturn;
		
		return toReturn;
	}
	
	this.getRoomDescription = function (roomName) {
		return this.rooms[roomName.toLowerCase ()].description;
	}
	
	this.exists = function (roomName) {
		var res = false;
		
		for (var index in this.rooms) {
			if (index === roomName.toLowerCase ()) {
				res = true;
				break;
			}
		}
		
		return res;
	}
	
	this.addUser = function (socket, sid, name, roomName) {
		if (!this.rooms[roomName.toLowerCase ()].isPresent (sid)) {
			return this.rooms[roomName.toLowerCase ()].addUser (socket, sid, name);
		}
		else return false;
	}
	
	this.removeUser = function (sid, roomName) {
		if (this.rooms[roomName.toLowerCase ()].isPresent (sid)) {
			if (this.rooms[roomName.toLowerCase ()].removeUser (sid)) {
				// If there's no more users in this room, it removes
				if (this.rooms[roomName.toLowerCase ()].isEmpty ()) delete this.rooms[roomName.toLowerCase ()];
			}
		}
		
		return true;
	}
	
	this.getUsernameList = function (roomName) {
		if (this.exists (roomName)) {
			return this.rooms[roomName.toLowerCase ()].getUsernameList ();
		}
		else return [];
	}
	
//	this.getUserList = function (roomName, sid) {
	this.getUserList = function (roomName) {
		if (this.exists (roomName)) {
//			return this.rooms[roomName.toLowerCase ()].getUserList (sid);
			return this.rooms[roomName.toLowerCase ()].getUserList ();
		}
		else return [];
	}
	
	this.getRoomNameList = function () {
		var res = new Array ();
		
		for (var room in this.rooms) res.push (this.rooms[room].name);
		
		return res;
	}
	
	return this;
})();
