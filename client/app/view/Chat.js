Ext.define ('TEWC.view.Chat', {
	extend: 'Ext.container.Container' ,
	alias: 'widget.chat' ,
	
	id: 'chat' ,
	
	layout: 'anchor' ,
	
	items: [{
		xtype: 'tabpanel' ,
		itemId: 'tpRooms' ,
		anchor: '100% 95.85%' ,
		minTabWidth: 50 ,
		activeItem: 0 ,
		bodyPadding: 5 ,
		margin: 5
	} , {
		xtype: 'textfield' ,
		itemId: 'tfSend' ,
		anchor: '100%' ,
		enableKeyEvents: true ,
		margin: '5 5 0 5' ,
		disabled: true
	}]
});
