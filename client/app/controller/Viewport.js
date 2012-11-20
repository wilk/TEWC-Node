Ext.define ('TEWC.controller.Viewport', {
	extend: 'Ext.app.Controller' ,
	
	views: ['Viewport'] ,
	models: ['Options'] ,
	stores: ['Options'] ,
	
	init: function () {
		this.control ({
			'tewcviewport': {
				afterrender: this.initOpts
			}
		});
	} ,
	
	initOpts: function (viewport) {
		var storeOpts = this.getOptionsStore () ,
		    opts = TEWC.util.Options;
	
		storeOpts.load (function (records) {
			var record = records[0];
		
			if (!Ext.isEmpty (record)) {
				opts.username = record.get ('username');
				opts.color = record.get ('color');
				opts.msgDateFormatPattern = record.get ('msgDateFormatPattern');
				opts.msgDateFormatType = record.get ('msgDateFormatType');
			}
			
			var tf = viewport.down ('textfield[itemId=tfLogin]');
			tf.setValue (opts.username);
			tf.focus ();
		});
	}
});
