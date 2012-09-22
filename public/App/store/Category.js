Ext.define("Omnes.store.Category", {
	extend: "Ext.data.TreeStore",
	autoLoad: true,
	root: {
        text: 'ExtJS'
    },
	proxy: {
		type: "ajax",
		url: "data/category.do",
		reader: {
			type: "json",
			successProperty: "success"
		}
	}
});