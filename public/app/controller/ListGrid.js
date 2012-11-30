/**
 * ListGrid Controller
 *
 */
Ext.define('Omnes.controller.ListGrid', {
	extend: "Ext.app.Controller",

	stores: ["Post"],
	views: ["listGrid.ListGrid" ],
	models: ["Post"],

	init: function() {
		var me = this;
		this.control({
			"button#btn-addpost": {
				click: this.createNewPost
			},
			"button#btn-delete": {
				click: this.deletePost
			}
		});
	},

	createNewPost: function() {
		var tabview = Ext.getCmp("TabView");
		// TODO: Get category id
		var listGrid = tabview.getComponent("list");
		var categoryId = listGrid.getCategoryId();
		var postStore = listGrid.getStore();

		var newrec = Ext.create("Omnes.model.Post", {
			title: "untitled",
			category: categoryId
		});
		postStore.add(newrec);
		postStore.sync({
			success: function(batch, options) {
				postStore.reload();
				// switch to editor
				tabview.setActiveTab(1);

				// create new post
				var editor = tabview.getComponent("editor");
				editor.getEditor().open(categoryId + "-untitled");
			}
		});

	},
	deletePost: function() {
		//...
	}

});