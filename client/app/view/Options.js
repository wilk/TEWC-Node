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
		xtype: 'container' ,
		html: '<i><b>Preview: </b></i><span id="previewMessage"></span>' ,
		padding: '5px'
	} , {
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
		} , {
			title: 'Color' ,
			itemId: 'tabColor' ,
			layout: {
				type: 'vbox' ,
				align: 'stretch'
			} ,
			items: [{
				xtype: 'colorpicker' ,
				itemId: 'cpColor' ,
				colors: ["000000", "993300", "333300", "003300", "003366", "000080", "333399", "333333", "800000", "FF6600", "808000", "008000", "008080", "0000FF", "666699", "808080", "FF0000", "FF9900", "99CC00", "339966", "33CCCC", "3366FF", "800080", "969696", "FF00FF", "FFCC00", "FFFF00", "00FF00", "00FFFF", "00CCFF", "993366", "C0C0C0", "FF99CC", "FFCC99", "FFFF99", "CCFFCC", "CCFFFF", "99CCFF", "CC99FF"] ,
				value: TEWC.util.Options.color
			}]
		}]
	}]
});
