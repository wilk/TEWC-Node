Ext.define ('TEWC.model.Rooms', {
	extend: 'Ext.data.Model' ,
	fields: [
		{name: 'room', type: 'string'} ,
		{name: 'protected', type: 'boolean', defaultValue: false}
	]
});
