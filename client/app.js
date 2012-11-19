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
		Ext.Ajax.request ({
			url: '../config.json' ,
			success: function (res) {
				var config = Ext.JSON.decode (res.responseText);
				TEWC.util.Options.baseURI = config.baseURI;
				TEWC.util.Options.port = config.port;
				
				Ext.Loader.loadScript (config.baseURI + ':' + config.port + '/socket.io/socket.io.js');
				
				Ext.create ('TEWC.view.Viewport');
			}
		});
	}
});
