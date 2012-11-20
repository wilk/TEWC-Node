// room = {
//   name: 'name' ,
//   description: 'description' ,
//   protected: true ,
//   password: 'password'
// }
module.exports = Room = function (room) {
	this.name = room.name;
	this.description = room.description || '';
	this.protected = room.protected || false;
	this.password = room.password || '';
	this.users = {};
	
	// TODO: pass the entire socket structure? Why not only sid, username and rooms?
	this.addUser = function (socket, sid, name) {
		if (this.isPresent (sid)) return false;
		else {
			this.users[sid] = {
				'socket': socket ,
				'sid': sid ,
				'name': name
			};
			
			return true;
		}
	}
	
	this.isEmpty = function () {
		for (var user in this.users) {
			if (this.users.hasOwnProperty (user)) return false;
		}
		
		return true;
	}
	
	this.removeUser = function (sid) {
		if (this.isPresent (sid)) {
			delete this.users[sid];
			
			return true;
		}
		else return false;
	}
	
	this.isPresent = function (sid) {
		var res = false;
		
		for (var index in this.users) {
			if (index === sid) {
				res = true;
				break;
			}
		}
		
		return res;
	}
	
	this.getUsernameList = function () {
		var ul = new Array ();
		
		for (var ssid in this.users) ul.push (this.users[ssid].name);
		
		return ul;
	}
	
	this.getUserList = function () {
		var ul = new Array ();
		
		for (var ssid in this.users) ul.push (this.users[ssid].socket);
		
		return ul;
	}
	
	// Displays a message with the name of the user
	this.displayMsg = function (msg) {
		// uses 'this' instead of 'this' because it refers at this instance, not at the last one
		console.log (this.name + ': ' + msg + '\n');
	}
}
