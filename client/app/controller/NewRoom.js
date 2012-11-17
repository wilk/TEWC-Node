Ext.define ('TEWC.controller.NewRoom', {
	extend: 'Ext.app.Controller' ,
	
	views: ['NewRoom'] ,
	
	init: function () {
		this.control ({
			'newroom button[itemId=btnCreate]': {
				click: this.createRoom
			} ,
			'newroom button[itemId=btnCancel]': {
				click: this.cancel
			}
		});
	} ,
	
	createRoom: function (btn) {
		var form = btn.up('newroom').down('form[itemId=fmRoom]').getForm ();
		
		if (form.isValid ()) {
			var params = form.getFieldValues () ,
			    ws = TEWC.util.WebSocket;
			
			ws.send ('create room', {
				name: params.name ,
				description: params.description
			});
			
			this.cancel (btn);
		}
		else {
			form.markInvalid ('This field has to be filled!');
		}
	} ,
	
	cancel: function (btn) {
		btn.up('newroom').close ();
	}
});
