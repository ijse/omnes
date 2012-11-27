Ext.define("Omnes.store.Post", {
	extend: "Ext.data.Store",
	model: "Omnes.model.Post",
	autoLoad: true,
	autoSync: false,
	proxy: {
		type: "ajax",
		// url: "post/list",
		reader: {
			type: 'json',
			root: 'posts',
			successProperty: 'success'
		},
		api: {
			read: "post/list",
			create: "post/add",
			update: "post/save",
			destroy: "post/delete"
		}
	}
});