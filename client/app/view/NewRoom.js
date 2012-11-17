Ext.define ('TEWC.view.NewRoom', {
	extend: 'Ext.window.Window' ,
	alias: 'widget.newroom' ,
	
	title: 'New Room' ,
	width: 300 ,
	modal: true ,
	
	layout: {
		type: 'vbox' ,
		align: 'stretch'
	} ,
	
	items: [{
		xtype: 'form' ,
		itemId: 'fmRoom' ,
		layout: {
			type: 'vbox' ,
			align: 'stretch'
		} ,
		bodyPadding: 3 ,
		
		items: [{
			xtype: 'textfield' ,
			name: 'name' ,
			emptyText: 'Room name' ,
			allowBlank: false ,
			enableKeyEvents: true
		} , {
			xtype: 'textarea' ,
			name: 'description' ,
			emptyText: 'Room description ...'
		}]
	}] ,
	
	bbar: {
		xtype: 'toolbar' ,
		items: ['->', '-', {
			xtype: 'button' ,
			icon: 'images/cross.png' ,
			itemId: 'btnCancel' ,
			text: 'Cancel'
		} , '-' , {
			xtype: 'button' ,
			icon: 'images/apply.png' ,
			itemId: 'btnCreate' ,
			text: 'Create'
		}]
	}
});
