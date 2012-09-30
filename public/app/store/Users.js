
Ext.define("Omnes.store.Users", {
	extend: "Ext.data.Store",
	//fields: ["name", "email"],
	model: "Omnes.model.User",
	autoLoad: true,

	proxy: {
		type: "ajax",
		url: "data/users.json",
		api: {
			read: "data/users.json",
			update: "data/updateUsers.json"
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