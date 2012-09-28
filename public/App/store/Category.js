Ext.define("Omnes.store.Category", {
	extend: "Ext.data.TreeStore",
	model: "Omnes.model.Category",
	autoLoad: true,
	root: {
        title: "Omnes",
        expanded: true
    },
	proxy: {
		type: "ajax",
		api: {
			create: "data/category/add.json",
			read: "data/category/list.json",
			update: "data/category/update.json",
			destroy: "data/category/delete.json"
		}
	}
});