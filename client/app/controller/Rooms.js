Ext.define ('TEWC.controller.Rooms', {
	extend: 'Ext.app.Controller' ,
	
	views: ['Rooms'] ,
	models: ['Rooms'] ,
	stores: ['Rooms'] ,
	
	init: function () {
		this.control ({
			'roomlist': {
				itemdblclick: this.enterRoom
			}
		});
	} ,
	
	enterRoom: function (grid, record, item, index) {
		var rooms = Ext.getCmp('chat').down ('tabpanel[itemId=tpRooms]') ,
		    room = rooms.child ('#room' + record.get ('room'));
		
		if (Ext.isEmpty (room)) {
			TEWC.util.WebSocket.send ('enter room', record.get ('room'));
		}
		else {
			rooms.setActiveTab (room);
		}
	}
});
