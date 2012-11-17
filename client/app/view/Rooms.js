Ext.define ('TEWC.view.Rooms', {
	extend: 'Ext.grid.Panel' ,
	alias: 'widget.roomlist' ,
	
	id: 'roomlist' ,
	
	title: 'Rooms List' ,
	collapsible: true ,
	resizable: false ,
	store: 'Rooms' ,
	margin: '5 0 5 5' ,
	width: 102 ,
	
	columns: [{
		header: 'Room' ,
		dataIndex: 'room' ,
		flex: 1
	}]
});
