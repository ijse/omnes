Ext.define("Omnes.view.category.Tree", {
	extend: "Ext.tree.Panel",
	alias: "widget.category",
	xtype: "categoryTree",

	collapsible: true,
	title: 'Category',
	split: true,
	width: 150,
	rootVisible: true,
	lines: false,

	store: "Category",

	columns: [{
		xtype: 'treecolumn',
		header: '标题',
		dataIndex: 'title',
		flex: 1
	}],
	dockedItems: [{
		xtype: "toolbar",
		items: [{
			text: "btn!!"
		}]
	}]
});