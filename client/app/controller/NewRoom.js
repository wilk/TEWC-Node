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
			}
		});
	} ,
	
	focus: function (win) {
		win.down('textfield[name=name]').focus ();
	} ,
	
	parseText: function (tf, evt) {
		if (evt.getKey () === evt.ENTER) this.createRoom (tf);
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
