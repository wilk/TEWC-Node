Ext.define ('TEWC.util.Options', {
	singleton: true ,
	
	username: '' ,
	
	// users list of each rooms
	// rooms['Plaza'] -> ['user1', 'user2', ...]
	rooms: {} ,
	
	msgDateFormat: 'H:i:s' ,
	
	baseURI: 'http://localhost' ,
	port: 30000
});
