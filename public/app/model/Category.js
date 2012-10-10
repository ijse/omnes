/**
 * Category, 文件目录
 */
Ext.define("Omnes.model.Category", {
	extend: "Ext.data.Model",
	idProperty: "_id",
	fields: [{
		name: "_id",
		type: "string"
	}, {
		name: "title",
		type: "string"
	}, {
		name: "lastModify",
		type: "date",
		defaultValue: new Date(),
		sortType: "asDate"
	}, {
		name: "sortNo",
		type: "number"
	}, {
		name: "author",
		type: "auto"
	}],
	proxy: {
		type: "ajax",
		api: {
			create: "category/save",
			read: "category/list",
			update: "category/update",
			destroy: "category/delete"
		}
	}
});