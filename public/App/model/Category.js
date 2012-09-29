/**
 * Category, 文件目录
 */
Ext.define("Omnes.model.Category", {
	extend: "Ext.data.Model",
	fields: [
		{ name: "cid", type: "int" },
		{ name: "title", type: "string" }
	],
	proxy: {
		type: "ajax",
		api: {
			create: "category/add",
			read: "category/list",
			update: "data/category/update.json",
			destroy: "data/category/delete.json"
		}
	}
});