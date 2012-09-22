var store = Ext.create('Ext.data.TreeStore', {
    root: {
        expanded: true,
        children: [
            { text: "detention", leaf: true },
            { text: "homework", expanded: true, children: [
                { text: "book report", leaf: true },
                { text: "alegrbra", leaf: true}
            ] },
            { text: "buy lottery tickets", leaf: true }
        ]
    }
});

Ext.define("Omnes.view.category.Tree", {
	extend: "Ext.tree.TreePanel",
	alias: "widget.category",

	collapsible: true,
	title: 'Category',
	split: true,
	width: 150,

	store: "Category"
});