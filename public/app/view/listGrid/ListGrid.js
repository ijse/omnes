Ext.define('Omnes.view.listGrid.ListGrid', {
	extend: "Ext.grid.Panel",
	xtype: "listgrid",
	title: 'Simpsons',
	categoryId: "root",
	columns: [{
		text: '标题',
		dataIndex: 'title',
		flex: 1
	}, {
		text: '作者',
		dataIndex: 'author'
	}, {
		text: '最后修改',
		dataIndex: 'lastUpdate'
	}],
	tbar: [{
		text: "Add Post",
		itemId: "btn-addpost"
	}, {
		text: "Delete",
		itemId: "btn-delete"
	}],
	setCategoryId: function(id) {
		this.categoryId = id;
	},

	getCategoryId: function() {
		return this.categoryId;
	}
});