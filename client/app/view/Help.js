Ext.define ('TEWC.view.Help', {
	extend: 'Ext.window.Window' ,
	alias: 'widget.help' ,
	
	title: 'Help' ,
	modal: true ,
	width: 400 ,
	icon: 'images/question.png' ,
	
	html: [
		'<div class="help">' ,
			'<section class="help_section">' ,
				'<h1 class="help_title">Create a new room</h1>' ,
				'<p class="help_body">Click on the <b><i>New Room</i></b> button: a modal window will appear.<br/>Insert the name of the room (required) you want to create and, if you\'re interested, fill up the description field.<br/>Now click on the <b><i>Create</i></b> button and start chatting!</p>' ,
			'</section>' ,
			'<section class="help_section">' ,
				'<h1 class="help_title">Enter a room</h1>' ,
				'<p class="help_body">On the left side of the chat, there\'s a grid containing the rooms list.<br/>Double click on one of them to enter.</p>' ,
			'</section>' ,
			'<section class="help_section">' ,
				'<h1 class="help_title">PM users</h1>' ,
				'<p class="help_body">On the right side of the chat, there\'s another grid containing the users list.<br/>Double click on one of them to start a private discussion.</p>' ,
			'</section>' ,
			'<section class="help_section">' ,
				'<h1 class="help_title">Configure the options</h1>' ,
				'<p class="help_body">Setup your personal configuration, like the date and time format and the color of your username, by clicking on the <b><i>Options</i></b> button at the top of the chat.</p>' ,
			'</section>' ,
		'</div>'
	].join ('')
});
