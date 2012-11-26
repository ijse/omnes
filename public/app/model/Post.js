/**
 * Post
 */
Ext.define("Omnes.model.Post", {
	extend: "Ext.data.Model",
	idProperty: "_id",
	fields: [{
		name: "_id",
		type: "string"
	}, {
		name: "title",
		type: "string"
	}, {
		name: "author",
		type: "auto"
	}, {
		name: "category",
		type: "auto"
	}, {
		name: "content",
		type: "string"
	}, {
		name: "lastModify",
		type: "date",
		defaultValue: new Date(),
		sortType: "asDate"
	}, {
		name: "createTime",
		type: "date",
		defaultValue: new Date(),
		sortType: "asDate"
	}]
});