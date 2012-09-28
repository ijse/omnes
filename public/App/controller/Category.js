Ext.define('Omnes.controller.Category', {
	extend: "Ext.app.Controller",

	stores: [ "Category"],
	views: [
		"category.Tree",
		"category.ContextMenu"
	],
	models: [ "Category" ],

	refs: [
		{ ref: "listTree", selector: "*" },
		{
            ref: 'contextMenu',
            selector: 'categoryContextMenu',
            xtype: 'categoryContextMenu',
            autoCreate: true
        }
	],

	init: function() {
		var me = this;
		this.control({
			"categoryTree": {
				itemcontextmenu: me.showContextMenu
			}
		});
	},

	showContextMenu: function(view, list, node, rowIndex, e) {
		var contextMenu = this.getContextMenu();
		contextMenu.showAt(e.getX(), e.getY());
		e.preventDefault();
	}
});