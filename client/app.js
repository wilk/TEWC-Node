Ext.Loader.setConfig ({
	enabled: true
});

Ext.require (['*']);

Ext.application ({
	name: 'TEWC' ,
	
	requires: ['TEWC.util.Options', 'TEWC.util.WebSocket'] ,
	
	views: [
		'Menu' ,
		'Rooms' ,
		'Users' ,
		'Chat' ,
		'NewRoom' ,
		'Rooms' ,
		'Room'
	] ,
	models: [
		'Rooms' ,
		'Users'
	] ,
	stores: [
		'Rooms' ,
		'Users'
	] ,
	controllers: [
		'Menu' ,
		'Chat' ,
		'NewRoom' ,
		'Rooms' ,
		'Room' ,
		'Users'
	] ,
	
	launch: function () {
		Ext.create ('TEWC.view.Viewport');
	}
});
