Ext.define("Omnes.store.Category", {
	extend: "Ext.data.TreeStore",
	model: "Omnes.model.Category",
	autoLoad: true,
	autoSync: true,
	root: {
        title: "Omnes",
        expanded: true
    },
	proxy: {
		type: "ajax",
		api: {
			create: "category/add",
			read: "category/list",
			update: "data/category/update.json",
			destroy: "data/category/delete.json"
		}
	}
});