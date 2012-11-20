Ext.define ('TEWC.view.NewRoom', {
	extend: 'Ext.window.Window' ,
	alias: 'widget.newroom' ,
	
	title: 'New Room' ,
	width: 300 ,
	modal: true ,
	icon: 'images/balloon--plus.png' ,
	
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
			maxLength: 20 ,
			enableKeyEvents: true
		} , {
			xtype: 'textarea' ,
			name: 'description' ,
			emptyText: 'Room description ...'
		} , {
			xtype: 'container' ,
			layout: {
				type: 'hbox' ,
				align: 'stretch'
			} ,
			items: [{
				xtype: 'checkbox' ,
				name: 'protected' ,
				boxLabel: 'Protected' ,
				padding: '0 5 0 0'
			} , {
				xtype: 'textfield' ,
				name: 'password' ,
				inputType: 'password' ,
				hidden: true ,
				emptyText: 'Password' ,
				flex: 1
			}]
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
