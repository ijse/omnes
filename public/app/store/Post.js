Ext.define("Omnes.store.Post", {
	extend: "Ext.data.Store",
	model: "Omnes.model.Post",
	autoLoad: false,
	autoSync: false,

	proxy: {
		type: "ajax",
		url: "post/list",
		api: {
			create: "post/add",
			update: "post/save",
			destroy: "post/delete"
		}
	}
});