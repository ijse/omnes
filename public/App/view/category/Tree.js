/**
 * Omnes tree controller
 *  左侧目录树
 *
 */
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
		xtype: 'toolbar',
		dock: 'bottom',
		items: [{
			iconCls: 'category-new-item',
			tooltip: 'New Item'
		}, {
			iconCls: 'category-delete-item',
			id: 'delete-item-btn',
			tooltip: 'Delete Item'
		}, {
			iconCls: 'category-new-folder',
			tooltip: 'New Folder'
		}, {
			iconCls: 'category-delete-folder',
			id: 'delete-folder-btn',
			tooltip: 'Delete Folder'
		}]
	}],

	initComponent: function() {
		var me = this;

		this.callParent(arguments);
	}

});