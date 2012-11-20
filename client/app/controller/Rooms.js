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
		var opts = TEWC.util.Options ,
		    rooms = Ext.getCmp('chat').down ('tabpanel[itemId=tpRooms]') ,
		    room = Ext.isEmpty (opts.rooms['room' + record.get ('room')]) ? null : 
		    	   Ext.isEmpty (opts.rooms['room' + record.get ('room')].tab) ? null : opts.rooms['room' + record.get ('room')].tab;
		    
		if (Ext.isEmpty (room)) {
			if (record.get ('protected')) {
				Ext.create('TEWC.view.PromptPassword', {
					roomName: record.get ('room')
				}).show ();
			}
			else {
				TEWC.util.WebSocket.send ('enter room', {
					name: record.get ('room')
				});
			}
		}
		else rooms.setActiveTab (room);
	} ,
	
	highlight: function (records, index, item) {
		Ext.getCmp('roomlist').getSelectionModel().select (index);
		// TODO: it doens't work
//		Ext.get(item).highlight ('0000ff', {
//			attr: 'backgroundColor' ,
//			endColor: 'fffff' ,
//			easing: 'easeIn' ,
//			duration: 1000
//		});
//		Ext.get(grid.getView().getNode(index)).highlight ();
//		Ext.get(row).highlight ();
	}
});
