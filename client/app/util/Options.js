Ext.define ('TEWC.util.Options', {
	singleton: true ,
	
	globalApp: '' ,
	
	username: '' ,
	color: '000000' ,
	
	// ref for userlist and tab
	// rooms['Plaza'].userlist -> ['user1', 'user2', ...]
	// rooms['Plaza'].tab -> tab of tabpanel
	rooms: {} ,
	
	msgDateFormat: 'H:i:s' ,
	
	msgTemplate: Ext.create ('Ext.Template', [
		'<div class="message">' ,
			'<span class="message_timestamp">{timestamp}</span> ' ,
			'<span class="message_user" style="color:#{color};">{user}:</span> ' ,
			'<span class="message_body">{msg}</span>' ,
		'<div>'
	]) ,
	
	// cache for password of the just created room
	lastCreatedRoomPassword: '' ,
	
	// to avoid misurunderstanding with server disconnection
	normalDisconnection: false
});
