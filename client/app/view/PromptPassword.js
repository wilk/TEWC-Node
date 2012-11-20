Ext.define ('TEWC.view.PromptPassword', {
	extend: 'Ext.window.Window' ,
	alias: 'widget.promptpassword' ,
	
	title: 'Room password' ,
	width: 200 ,
	modal: true ,
	icon: 'images/lock.png' ,
	bodyPadding: 5 ,
	
	layout: {
		type: 'vbox' ,
		align: 'stretch'
	} ,
	
	items: [{
		xtype: 'textfield' ,
		name: 'password' ,
		inputType: 'password' ,
		emptyText: 'Password' ,
		allowBlank: false ,
		enableKeyEvents: true
	}]
});
