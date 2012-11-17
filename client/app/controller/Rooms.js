Ext.define ('TEWC.controller.Rooms', {
	extend: 'Ext.app.Controller' ,
	
	views: ['Rooms'] ,
	models: ['Rooms'] ,
	stores: ['Rooms'] ,
	
	init: function () {
		this.control ({
			'roomlist': {
				itemdblclick: this.enterRoom
			} ,
			'roomlist tableview[itemId=roomstable]': {
				itemadd: this.highlight
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
	} ,
	
	highlight: function (records, index, item) {
		// TODO: it doens't work
		Ext.get(item).highlight ('0000ff', {
			attr: 'backgroundColor' ,
			endColor: 'fffff' ,
			easing: 'easeIn' ,
			duration: 1000
		});
//		Ext.get(grid.getView().getNode(index)).highlight ();
//		Ext.get(row).highlight ();
	}
});
