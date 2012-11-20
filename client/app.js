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
		'Options'
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
		Ext.Ajax.request ({
			url: '../config.json' ,
			success: function (res) {
				var config = Ext.JSON.decode (res.responseText) ,
				    opts = TEWC.util.Options;
				
				opts.baseURI = config.baseURI;
				opts.port = config.port;
				
//				var storeOpts = Ext.data.StoreManager.lookup ('Options');
//				
//				storeOpts.load (function (records) {
//					var record = records[0];
//					
//					if (!Ext.isEmpty (record)) {
//						opts.username = record.get ('username');
//						opts.msgDateFormatPattern = record.get ('msgDateFormatPattern');
//						opts.msgDateFormatType = record.get ('msgDateFormatType');
//					}
					
					Ext.Loader.loadScript (config.baseURI + ':' + config.port + '/socket.io/socket.io.js');
				
					Ext.create ('TEWC.view.Viewport');
//				});
			}
		});
	}
});
