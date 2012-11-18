Ext.define ('TEWC.view.Options', {
	extend: 'Ext.window.Window' ,
	alias: 'widget.options' ,
	
	id: 'options' ,
	title: 'Options' ,
	modal: true ,
	width: 300 ,
	
	layout: {
		type: 'vbox' ,
		align: 'stretch'
	} ,
	
	items: [{
		xtype: 'tabpanel' ,
		itemId: 'tpOptions' ,
		layout: {
			type: 'vbox' ,
			align: 'stretch'
		} ,
		minTabWidth: 50 ,
		activeItem: 0 ,
		bodyPadding: 8 ,
		
		items: [{
			title: 'Date & Time' ,
			itemId: 'tabDateTime' ,
			layout: {
				type: 'vbox' ,
				align: 'stretch'
			} ,
			
			defaultType: 'container' ,
			
			items: [{
				html: '<i>Preview: </i><b class="previewDate">[15:31:49] Wilk: Hello!</b>' ,
				itemId: 'lblPreview' ,
				padding: '0 0 3 0'
			} , {
				layout: {
					type: 'vbox' ,
					align: 'stretch'
				} ,
				
				items: [{
					xtype: 'checkbox' ,
					itemId: 'cbDate' ,
					boxLabel: 'Date' ,
					name: 'date' ,
					inputValue: true
				} , {
					xtype: 'radiogroup' ,
					itemId: 'rgDate' ,
					disabled: true ,
					columns: 2 ,
					items: [
						{boxLabel: '27 Aug', name: 'rgDate', inputValue: 'd M'} ,
						{boxLabel: 'Tue 27', name: 'rgDate', inputValue: 'd D'} ,
						{boxLabel: '27/08', name: 'rgDate', inputValue: 'd/m'} ,
						{boxLabel: '27/08/2013', name: 'rgDate', inputValue: 'd/m/Y', checked: true}
					]
				}]
			} , {
				layout: {
					type: 'vbox' ,
					align: 'stretch'
				} ,
				
				items: [{
					xtype: 'checkbox' ,
					itemId: 'cbTime' ,
					boxLabel: 'Time' ,
					name: 'time' ,
					inputValue: true ,
					checked: true
				} , {
					xtype: 'radiogroup' ,
					itemId: 'rgTime' ,
					columns: 2 ,
					items: [
						{boxLabel: '15:31', name: 'rgTime', inputValue: 'H:i'} ,
						{boxLabel: '15:31:49', name: 'rgTime', inputValue: 'H:i:s', checked: true}
					]
				}]
			}]
		}]
	}]
});
