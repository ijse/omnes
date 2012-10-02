/**
 * Category, 文件目录
 */
Ext.define("Omnes.model.Category", {
	extend: "Ext.data.Model",
	idProperty: "_id",
	fields: [
		{ name: "_id", type: "string" },
		{ name: "title", type: "string" }
	],
	proxy: {
		type: "ajax",
		api: {
			create: "category/save",
			read: "category/list",
			update: "category/save",
			destroy: "category/delete"
		}
	}
});
