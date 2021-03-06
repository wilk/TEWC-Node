Ext.define ('TEWC.view.Rooms', {
	extend: 'Ext.grid.Panel' ,
	alias: 'widget.roomlist' ,
	
	id: 'roomlist' ,
	
	title: 'Rooms List' ,
	collapsible: true ,
	resizable: true ,
	store: 'Rooms' ,
	margin: '5 0 5 5' ,
	width: 102 ,
	scroll: true ,
	
	columns: [{
		header: 'Room' ,
		dataIndex: 'room' ,
		renderer: function (value, meta, record) {
			if (record.get ('protected')) {
				meta.tdCls = 'room_protected';
			}
			
			return value;
		} ,
		flex: 1
	}] ,
	
	viewConfig: {
		itemId: 'roomstable'
	}
});
