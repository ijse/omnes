Ext.define("Omnes.store.Category", {
	extend: "Ext.data.TreeStore",
	model: "Omnes.model.Category",
	autoLoad: true,
	root: {
        title: "Omnes",
		id: "0",
        expanded: true
    },
	proxy: {
		type: "ajax",
		api: {
			create: "category/save",
			read: "category/list",
			update: "category/update",
			destroy: "category/delete"
		}
	}
});
