Ext.define ('TEWC.controller.Users', {
	extend: 'Ext.app.Controller' ,
	
	views: ['Users'] ,
	
	init: function () {
		this.control ({
			'userlist': {
				itemdblclick: this.pm
			} ,
			'userlist tableview[itemId=userstable]': {
				itemadd: this.highlight
			}
		});
	} ,
	
	pm: function (grid, record) {
		var opts = TEWC.util.Options;
		if (record.get ('user') !== opts.username) {
			var rooms = Ext.getCmp('chat').down ('tabpanel[itemId=tpRooms]') ,
			    room = Ext.isEmpty (opts.rooms['user' + record.get ('user')]) ? null : opts.rooms['user' + record.get ('user')].tab;
			
			if (Ext.isEmpty (room)) {
				var roomDiv = [
					'<div class="room">' ,
						'<div class="room_name">' ,
							'Private chat' ,
						'</div>' ,
						'<div class="room_description">' ,
							'between you and ' + record.get ('user') ,
						'</div>' ,
						'<div class="room_body"></div>' ,
					'</div>'
				].join ('');
			
				room = Ext.create ('TEWC.view.Room', {
					title: record.get ('user') ,
					itemId: 'user' + record.get ('user') ,
					// To distinguish user (PM) and room
					roomType: 'user' ,
					html: roomDiv
				});
			
				rooms.add (room);				
				opts.rooms['user' + record.get ('user')] = {
					tab: room
				};
			}
			
			rooms.setActiveTab (room);
		}
	} ,
	
	highlight: function (records, index, item) {
		Ext.getCmp('userlist').getSelectionModel().select (index);
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
