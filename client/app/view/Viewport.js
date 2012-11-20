Ext.define ('TEWC.view.Viewport', {
	extend: 'Ext.container.Viewport' ,
	alias: 'widget.tewcviewport' ,
	
	id: 'viewportPage' ,
	requires: [
		'TEWC.view.Menu' ,
		'TEWC.view.Users' ,
		'TEWC.view.Rooms' ,
		'TEWC.view.Chat'
	] ,
	layout: 'border' ,
	
	items: [{
		region: 'north' ,
		xtype: 'menunav'
	} , {
		region: 'east' ,
		xtype: 'userlist'
	} , {
		region: 'west' ,
		xtype: 'roomlist'
	} , {
		region: 'center' ,
		xtype: 'chat'
	}]
});
