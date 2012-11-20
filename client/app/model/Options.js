Ext.define ('TEWC.model.Options', {
	extend: 'Ext.data.Model' ,
	fields: ['id' ,
		{name: 'username', type: 'string'} ,
		{name: 'msgDateFormatPattern', type: 'string', defaultValue: 'H:i:s'} ,
		{name: 'msgDateFormatType', type: 'string', defaultValue: 'time'}
	] ,
	proxy: {
		type: 'localstorage' ,
		id: 'options'
	}
});
