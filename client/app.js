Ext.Loader.setConfig ({
	enabled: true
});

Ext.require (['*']);

Ext.EventManager.onWindowUnload (function () {
	TEWC.util.WebSocket.disconnect ();
});

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
		'Room' ,
		'Options'
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
		'Users' ,
		'Options'
	] ,
	
	launch: function () {
		Ext.create ('TEWC.view.Viewport');
	}
});
