Ext.define ('TEWC.view.Users', {
	extend: 'Ext.grid.Panel' ,
	alias: 'widget.userlist' ,
	
	id: 'userlist' ,
	
	title: 'Users List' ,
	collapsible: true ,
	resizable: false ,
	store: 'Users' ,
	margin: '5 5 5 0' ,
	width: 102 ,
	
	columns: [{
		header: 'User' ,
		dataIndex: 'user' ,
		flex: 1
	}] ,
	
	viewConfig: {
		itemId: 'userstable'
	}
});
