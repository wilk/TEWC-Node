Ext.define ('TEWC.controller.Options', {
	extend: 'Ext.app.Controller' ,
	
	views: ['Options'] ,
	
	init: function () {
		this.control ({
			'options': {
				show: this.initOpts ,
				close: this.saveOpts
			} ,
			'options checkbox[itemId=cbDate]': {
				change: this.checkDate
			} ,
			'options checkbox[itemId=cbTime]': {
				change: this.checkTime
			} ,
			'options radiogroup[itemId=rgDate]': {
				change: this.changeDate
			} ,
			'options radiogroup[itemId=rgTime]': {
				change: this.changeTime
			} ,
		});
	} ,
	
	updatePreview: function () {
		var 
	} ,
	
	changeTime: function (rb, val) {
		this.updatePreview ();
	} ,
	
	changeDate: function (rb, val) {
		this.updatePreview ();
	} ,
	
	checkTime: function (cb, val) {
		var rgTime = cb.next ('radiogroup[itemId=rgTime]');
		
		rgTime.setDisabled (!val);
		
		// TODO: update date format
		this.updatePreview ();
	} ,
	
	checkDate: function (cb, val) {
		var rgDate = cb.next ('radiogroup[itemId=rgDate]');
		
		rgDate.setDisabled (!val);
		
		// TODO: update date format
		this.updatePreview ();
	} ,
	
	initOpts: function (win) {
	
	} ,
	
	saveOpts: function (win) {
		
	}
});
