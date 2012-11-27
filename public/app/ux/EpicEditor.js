Ext.define("Omnes.ux.EpicEditor", {
	extend: 'Ext.container.Container',
	alias: 'widget.epiceditor',
	xtype: 'epiceditor',

	content: "Hello Blank!",

	editorConfig: {
		container: 'epiceditor',
		basePath: 'resources/epiceditor',
		clientSideStorage: true,
		localStorageName: 'epiceditor',
		parser: marked,
		file: {
			name: 'epiceditor',
			defaultContent: '',
			autoSave: 100
		},
		theme: {
			base: '/themes/base/epiceditor.css',
			preview: '/themes/preview/github.css',
			editor: '/themes/editor/epic-light.css'
		},
		focusOnLoad: true,
		shortcut: {
			modifier: 18,
			fullscreen: 70,
			preview: 80,
			edit: 79
		}
	},

	_fullscreen: false,
	epicEditor: null,

	initComponent: function() {
		var me = this;
		me.callParent();
	},

	onRender: function () {
		var me = this;
		me.callParent(arguments);

		// Create EpicEditor
		me.editorConfig = Ext.apply(me.editorConfig, {
			container: me.el.dom,
			content: me.content
		});
		me.epicEditor = new EpicEditor(me.editorConfig);
		me.el.on('load', me.onLoad, me);

		// Solve fullscreen
		me.epicEditor.on("preview", function() {
			me._fullscreen = true;
		});
	},
	onLoad: function () {
		this.fireEvent('load', this);
	},
	setValue: function (filename, content) {
		this.epicEditor.importFile(filename, content);
	},
	getValue: function (filename, type) {
		this.epicEditor.exportFile(filename, type);
	},
	getEditor: function() {
		return this.epicEditor;
	},
	afterLayout: function() {
		if(!this._fullscreen) {
			this.epicEditor.load();
		}
		this._fullscreen = false;
	},
	onResize: function(me, width, height, oldWidth, oldHeight, eOpts) {
		this.callParent(arguments);
	}
});


