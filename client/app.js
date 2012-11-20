Ext.Loader.setConfig ({
	enabled: true
});

Ext.require ([
	'Ext.window.Window' ,
	'Ext.tab.Panel' ,
	'Ext.form.Panel'
]);

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
		'Options' ,
		'Help'
	] ,
	models: [
		'Rooms' ,
		'Users' ,
		'Options'
	] ,
	stores: [
		'Rooms' ,
		'Users' ,
		'Options'
	] ,
	controllers: [
		'Menu' ,
		'Chat' ,
		'NewRoom' ,
		'Rooms' ,
		'Room' ,
		'Users' ,
		'Options' ,
		'Viewport'
	] ,
	
	launch: function () {
		var opts = TEWC.util.Options;
		
		opts.globalApp = this;
		
		Ext.Ajax.request ({
			url: '../config.json' ,
			success: function (res) {
				var config = Ext.JSON.decode (res.responseText);
				
				opts.baseURI = config.baseURI;
				opts.port = config.port;
				
				Ext.Loader.loadScript (config.baseURI + ':' + config.port + '/socket.io/socket.io.js');
				Ext.create ('TEWC.view.Viewport');
			}
		});
	}
});
