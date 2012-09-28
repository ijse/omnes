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
			create: "",
			read: "data/category/list.json",
			update: "",
			destroy: ""
		}
	}
});