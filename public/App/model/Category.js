/**
 * Category, 文件目录
 */
Ext.define("Omnes.model.Category", {
	extend: "Ext.data.Model",
	fields: [
		{ name: "_id", type: "int" },
		{ name: "title", type: "string" }
	]
});