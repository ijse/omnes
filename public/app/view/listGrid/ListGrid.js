Ext.define('Omnes.view.listGrid.ListGrid', {
	extend: "Ext.grid.Panel",
	xtype: "listgrid",
	title: 'Simpsons',
	store: "Post",
	columns: [{
		text: '标题',
		dataIndex: 'title',
		flex: 1
	}, {
		text: '作者',
		dataIndex: 'author',
		renderer: function(value) {
			return value.name;
		}
	}, {
		text: '最后修改',
		dataIndex: 'lastUpdate',
		renderer: function(value, metaData, record) {
			return Ext.Date.format(value, 'Y-m-d H:i:s');
		}
	}],
	tbar: [{
		text: "Add Post",
		itemId: "btn-addpost"
	}, {
		text: "Delete",
		itemId: "btn-delete"
	}],
	dockedItems: [{
        xtype: 'pagingtoolbar',
        store: "Post",   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }],

	categoryId: "root",
	setCategoryId: function(id) {
		this.categoryId = id;
	},

	getCategoryId: function() {
		return this.categoryId;
	}
});