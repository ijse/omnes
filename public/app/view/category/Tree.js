/**
 * Omnes tree controller
 *  左侧目录树
 *
 */
Ext.define("Omnes.view.category.Tree", {
	extend: "Ext.tree.Panel",
	alias: "widget.category",
	xtype: "categoryTree",
	requires: [
		'Omnes.ux.DragDrop',
		'Omnes.ux.DropZone',
		'Ext.tree.plugin.TreeViewDragDrop'
	],

	collapsible: true,
	title: 'Category',
	split: true,
	width: 150,
	rootVisible: true,
	lines: false,

	store: "Category",

	viewConfig: {
		plugins: {
			ptype: 'categorydragdrop',
			// ddGroup: 'task',
			dragText: 'Drag to recorder'
		}
	},

	columns: [{
		xtype: 'treecolumn',
		header: '标题',
		dataIndex: 'title',
		flex: 1
	}, {
		header: '作者',
		dataIndex: 'author',
		renderer: function(value) {
			return value.name;
		}
	}, {
		xtype:'datecolumn',
		header: '最后更新',
		dataIndex: 'lastModify',
		width: 150,
		renderer: function(value, metaData, record) {
			if(!record.data.leaf || !value) {
				return "";
			}
			return Ext.Date.format(value, 'Y-m-d H:i:s');
		}
	}],
	hideHeaders: false,

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

		me.addEvents( 'listdrop' );
		me.relayEvents(me.getView(), ['listdrop']);
	}

});
