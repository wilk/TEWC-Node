Ext.define ('TEWC.util.Options', {
	singleton: true ,
	
	username: '' ,
	
	// ref for userlist and tab
	// rooms['Plaza'].userlist -> ['user1', 'user2', ...]
	// rooms['Plaza'].tab -> tab of tabpanel
	rooms: {} ,
	
	msgDateFormat: 'H:i:s'
});
