Ext.define ('TEWC.view.Menu', {
	extend: 'Ext.container.Container' ,
	alias: 'widget.menunav' ,
	
	id: 'menuNav' ,
	
	items: [{
		xtype: 'container' ,
		bodyPadding: 10 ,
		style: {
			background: '#7F99BE url(images/layout-browser-hd-bg.gif) repeat-x center'
		} ,
		html: '<h1 class="headerTitle">TEWC :: The Easiest Web Chat</h1>'
	} , {
		xtype: 'toolbar' ,
		
		defaults: {
			xtype: 'button'
		} ,
		
		items: [{
			itemId: 'btnNewRoom' ,
			text: 'New Room' ,
			tooltip: 'Make a new room' ,
			icon: 'images/balloon--plus.png' ,
			hidden: true
		} , '-' , {
			itemId: 'btnOptions' ,
			text: 'Options' ,
			tooltip: 'Options setup' ,
			icon: 'images/gear.png' ,
			hidden: true
		} , '-' , {
			itemId: 'btnHelp' ,
			text: 'Help' ,
			tooltip: 'How-to and guidelines!' ,
			icon: 'images/question.png' ,
			hidden: true
		} , '-' , '->', {
			xtype: 'textfield' ,
			itemId: 'tfLogin' ,
			emptyText: 'Username' ,
			enableKeyEvents: true ,
			allowBlank: false
		} , {
			xtype: 'label' ,
			itemId: 'lblUsername'
		} , '-' , {
			itemId: 'btnLogout' ,
			text: 'Logout' ,
			tooltip: 'Leave the chat' ,
			icon: 'images/door-open-in.png' ,
			hidden: true
		}]
	}]
});
