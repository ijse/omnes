Ext.define("Omnes.store.Category", {
	extend: "Ext.data.TreeStore",
	model: "Omnes.model.Category",
	autoLoad: true,
	root: {
        title: "Omnes",
		id: "0",
        expanded: true
    }
});
