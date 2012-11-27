Ext.define ('TEWC.controller.NewRoom', {
	extend: 'Ext.app.Controller' ,
	
	views: ['NewRoom'] ,
	
	init: function () {
		this.control ({
			'newroom': {
				afterlayout: this.focus
			} ,
			'newroom button[itemId=btnCreate]': {
				click: this.createRoom
			} ,
			'newroom button[itemId=btnCancel]': {
				click: this.cancel
			} ,
			'newroom textfield[name=name]': {
				specialkey: this.parseText
			} ,
			'newroom checkbox[name=protected]': {
				change: this.setProtected
			}
		});
	} ,
	
	setProtected: function (cb, checked) {
		cb.next('textfield[name=password]').setVisible (checked);
	} ,
	
	focus: function (win) {
		win.down('textfield[name=name]').focus ();
	} ,
	
	parseText: function (tf, evt) {
		if (evt.getKey () === evt.ENTER) this.createRoom (tf);
	} ,
	
	createRoom: function (btn) {
		var panelForm = btn.up('newroom').down ('form[itemId=fmRoom]') ,
		    form = panelForm.getForm () ,
		    tfRoomName = panelForm.down ('textfield[name=name]');
		
		tfRoomName.setValue (tfRoomName.getValue().trim ());
		
		if (form.isValid ()) {
			var params = form.getFieldValues () ,
			    ws = TEWC.util.WebSocket;
			
			params.password = params.password.trim ();
			
			if ((params.protected) && (Ext.isEmpty (params.password))) {
				panelForm.down('textfield[name=password]').markInvalid ('Fill this field first!');
			}
			else {
				Ext.getCmp('viewportPage').setLoading (true);
				
				ws.send ('create room', params);
				
				if (params.protected) TEWC.util.Options.lastCreatedRoomPassword = params.password;
				
				this.cancel (btn);
			}
		}
		else form.markInvalid ();
	} ,
	
	cancel: function (btn) {
		btn.up('newroom').close ();
	}
});
