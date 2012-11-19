Ext.define ('TEWC.util.Options', {
	singleton: true ,
	
	username: '' ,
	
	// users list of each rooms
	// rooms['Plaza'] -> ['user1', 'user2', ...]
	rooms: {} ,
	
	msgDateFormat: Ext.util.Cookies.get ('msgDateFormatPattern') == null ? 'H:i:s' : Ext.util.Cookies.get ('msgDateFormatPattern')
});
