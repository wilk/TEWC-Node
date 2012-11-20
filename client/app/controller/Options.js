Ext.define ('TEWC.controller.Options', {
	extend: 'Ext.app.Controller' ,
	
	views: ['Options'] ,
	models: ['Options'] ,
	stores: ['Options'] ,
	
	init: function () {
		this.control ({
			'options': {
				afterrender: this.updatePreview ,
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
			'options colorpicker[itemId=cpColor]': {
				select: this.setColor
			}
		});
	} ,
	
	setColor: function (cp, color) {
		TEWC.util.Options.color = color;
		
		this.updatePreview ();
	} ,
	
	updatePreview: function () {
		var opts = TEWC.util.Options;
		
		opts.msgTemplate.overwrite ('previewMessage', {
			timestamp: Ext.isEmpty (opts.msgDateFormat) ? '' : '[' + Ext.Date.format (new Date (), opts.msgDateFormat) + ']' ,
			user: opts.username ,
			color: opts.color ,
			msg: 'Hello world!'
		});
	} ,
	
	changeTime: function (rb, val) {
		this.snapshot ();
		this.updatePreview ();
	} ,
	
	changeDate: function (rb, val) {
		this.snapshot ();
		this.updatePreview ();
	} ,
	
	checkTime: function (cb, checked) {
		var rgTime = cb.next ('radiogroup[itemId=rgTime]');
		
		rgTime.setVisible (checked);
		
		this.snapshot ();
		
		this.updatePreview ();
	} ,
	
	checkDate: function (cbDate, checked) {
		var rgDate = cbDate.next ('radiogroup[itemId=rgDate]');
		
		rgDate.setVisible (checked);
		
		this.snapshot ();
		
		this.updatePreview ();
	} ,
	
	snapshot: function () {
		var win = Ext.getCmp ('options') ,
		    cbDate = win.down ('checkbox[itemId=cbDate]') ,
		    rgDate = win.down ('radiogroup[itemId=rgDate]') ,
		    cbTime = win.down ('checkbox[itemId=cbTime]') ,
		    rgTime = win.down ('radiogroup[itemId=rgTime]') ,
		    datePattern = '' ,
		    timePattern = '' ,
		    pattern = '' ,
		    separator = '-';
		
		if (cbDate.getValue ()) datePattern = rgDate.getValue().rgDate;
		
		if (cbTime.getValue ()) timePattern = rgTime.getValue().rgTime;
		
		pattern = datePattern;
		
		if (cbDate.getValue () && cbTime.getValue ()) pattern += separator + timePattern;
		else pattern += timePattern;
		
		TEWC.util.Options.msgDateFormat = pattern;
	} ,
	
	initOpts: function (win) {
		var storeOpts = this.getOptionsStore () ,
		    modelOpts = storeOpts.first () ,
		    ckFormatPattern = Ext.isEmpty (modelOpts) ? null : modelOpts.get ('msgDateFormatPattern') ,
		    ckFormatType = Ext.isEmpty (modelOpts) ? null : modelOpts.get ('msgDateFormatType');
		
		if (ckFormatPattern != null) {
			var cbDate = win.down ('checkbox[itemId=cbDate]') ,
			    rgDate = win.down ('radiogroup[itemId=rgDate]') ,
			    cbTime = win.down ('checkbox[itemId=cbTime]') ,
			    rgTime = win.down ('radiogroup[itemId=rgTime]');
			
			cbDate.setValue (false);
			cbTime.setValue (false);
			
			if (!Ext.isEmpty (ckFormatPattern)) {
				if (ckFormatType === 'datetime') {
					var pattern = ckFormatPattern.split ('-');
					
					cbDate.setValue (true);
					rgDate.setValue ({rgDate: pattern[0]});
					cbTime.setValue (true);
					rgTime.setValue ({rgTime: pattern[1]});
				}
				else if (ckFormatType === 'date') {
					cbDate.setValue (true);
					rgDate.setValue ({rgDate: ckFormatPattern});
				}
				else if (ckFormatType === 'time') {
					cbTime.setValue (true);
					rgTime.setValue ({rgTime: ckFormatPattern});
				}
			}
		}
	} ,
	
	saveOpts: function (win) {
		var storeOpts = this.getOptionsStore () ,
		    modelOpts = storeOpts.first () ,
		    cbDate = win.down ('checkbox[itemId=cbDate]') ,
		    cbTime = win.down ('checkbox[itemId=cbTime]') ,
		    type = cbDate.getValue () && cbTime.getValue () ? 'datetime' :
			   cbDate.getValue () ? 'date' :
			   cbTime.getValue () ? 'time' : '' ,
		    data = {
		    	msgDateFormatPattern: TEWC.util.Options.msgDateFormat ,
		    	msgDateFormatType: type ,
		    	color: TEWC.util.Options.color
		    };
		
		if (Ext.isEmpty (modelOpts)) storeOpts.add (data);
		else modelOpts.set (data);
		
		storeOpts.sync ();
		
		TEWC.util.WebSocket.send ('change color', TEWC.util.Options.color);
		
		Ext.getCmp('chat').down('textfield[itemId=tfSend]').focus ();
	}
});
