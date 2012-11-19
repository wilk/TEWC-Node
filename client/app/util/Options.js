Ext.define ('TEWC.util.Options', {
	singleton: true ,
	
	username: '' ,
	
	// ref for userlist and tab
	// rooms['Plaza'].userlist -> ['user1', 'user2', ...]
	// rooms['Plaza'].tab -> tab of tabpanel
	rooms: {} ,
	
	msgDateFormat: Ext.util.Cookies.get ('msgDateFormatPattern') == null ? 'H:i:s' : Ext.util.Cookies.get ('msgDateFormatPattern')
});
