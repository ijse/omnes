Ext.define("Omnes.store.Post", {
	extend: "Ext.data.Store",
	model: "Omnes.model.Post",
	autoLoad: true,

	proxy: {
		type: "ajax",
		url: "data/users.json",
		api: {
			read: "post/list",
			update: "post/save",
			create: "post/add",
			destroy: "post/delete"
		},
		reader: {
			type: "json",
			root: "users",
			successProperty: "success"
		}
	}
	// data: [
	//	{ name: "ijse", email: "i@ijser.cn" },
	//	{ name: "Tommy", email: "tommy@sencha.com" }
	// ]
});