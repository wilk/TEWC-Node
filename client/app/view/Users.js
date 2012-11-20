Ext.define ('TEWC.view.Users', {
	extend: 'Ext.grid.Panel' ,
	alias: 'widget.userlist' ,
	
	id: 'userlist' ,
	
	title: 'Users List' ,
	collapsible: true ,
	resizable: true ,
	store: 'Users' ,
	margin: '5 5 5 0' ,
	width: 102 ,
	scroll: true ,
	
	columns: [{
		header: 'User' ,
		dataIndex: 'user' ,
		flex: 1
	}] ,
	
	viewConfig: {
		itemId: 'userstable'
	}
});
