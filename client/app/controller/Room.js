Ext.define ('TEWC.controller.Room', {
	extend: 'Ext.app.Controller' ,
	
	views: ['Room'] ,
	models: ['Rooms'] ,
	stores: ['Rooms'] ,
	
	init: function () {
		this.control ({
			'room': {
				close: this.exitRoom
			}
		});
	} ,
	
	exitRoom: function (room) {
		if (room.roomType == 'room') {
			TEWC.util.WebSocket.send ('exit room', room.title);
		}
	}
});
