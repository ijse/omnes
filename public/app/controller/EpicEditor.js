/**
 *  EpicEditor Controller
 */
Ext.define('Omnes.controller.EpicEditor', {
	extend: "Ext.app.Controller",

	stores: ["Post"],
	views: ["editor.EpicEditor" ],
	models: ["Post"],

	init: function() {
		var me = this;
		me.control({
			"button#btnSave": {
				click: me.savePost
			}
		});
	},

	savePost: function() {
		var postStore = this.getPostStore();
		// Get editor content
	}

});