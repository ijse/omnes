

Ext.define('Omnes.view.listGrid.EpicEditor', {
	extend: "Ext.panel.Panel",
	xtype: "editorpanel",
	title: "编辑器",
	requires: ['Omnes.ux.EpicEditor'],

	itemId: "editorPanel",
	layout: "fit",
	tbar: [{
		xtype: "button",
		itemId: "btnSave",
		text: "保存"
	}],
	items: [{
		xtype: "epiceditor",
		itemId: "editor"
	}]
});