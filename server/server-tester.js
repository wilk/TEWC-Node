var url = 'http://localhost' ,
    port = 3000 ,
    sFirst = io.connect (url + ':' + port);

var defaultRoom = 'Plaza' ,
    roomlist = new Object ();

sFirst.on ('connect', function () {
	// 1: login
	console.log ('1) Login...');
	sFirst.emit ('login', 'Wilk');
	
	
	
	// 5: start second user
});

sFirst.on ('login', function (response) {
	if (response.status) {
		for (var index in response.roomNameList) {
			roomlist[response.roomNameList[index].toLowerCase ()] = {
				'name': response.roomNameList[index] ,
				'description': '' ,
				'userlist': new Array ()
			};
		}
		
		console.log ('1) Login: done!');
		console.log ('Room list: ');
		for (var i in roomlist) console.log (roomlist[i].name);
		// 2: enter Plaza room
		console.log ('2) Enter ' + defaultRoom + ' room...');
		sFirst.emit ('enter room', defaultRoom);
	}
	else {
		console.log ('1) Login error: ' + response.error);
	}
});

sFirst.on ('enter room', function (response) {
	switch (response.type) {
		case 'unicast':
			if (response.status) {
				var room = response.room.name.toLowerCase ();
				
				console.log (response);
				
				roomlist[room] = {
					'name': response.room.name ,
					'description': response.room.description ,
					'userlist': response.userlist
				};
				
				console.log ('2) Enter ' + roomlist[room].name + ' done!');
				console.log ('2) ' + roomlist[room].name + ' description: \n' + roomlist[room].description);
				console.log ('2) ' + roomlist[room].name + ' userlist: \n' + roomlist[room].userlist);
				
				if (room !== 'pizza') {
				
					// 3: create Pizza room
					console.log ('3) Create Pizza room ...');
					sFirst.emit ('create room', {'name': 'Pizza', 'description': 'A pizza room where you can speak and ask everything about the real italian Pizza!'});
				}
				else {
					// 5: exit Pizza room
					console.log ('5) Exit Pizza room ...');
					sFirst.emit ('exit room', 'Pizza');
					
					// 6: disconnect
					sFirst.disconnect ();
				}
			}
			else {
				console.log ('2) Enter room ' + response.room + ' error: ' + response.error);
			}
			break;
		case 'anycast':
			break
	}
});

sFirst.on ('create room', function (response) {
	switch (response.type) {
		case 'unicast':
			if (response.status) {
				console.log ('3) Create ' + response.room + ' done!');
				
				// 4: enter Pizza room
				console.log ('4) Enter ' + response.room + ' room...');
				sFirst.emit ('enter room', response.room);
			}
			else {
				console.log ('3) Create room ' + response.room + ' error: ' + response.error);
			}
			break;
		case 'anycast':
			break;
	}
});
