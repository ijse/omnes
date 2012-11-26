var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

var schema = mongoose.Schema({
	title: String,
	content: String,
	author: {
		"type": ObjectId,
		"ref": "User"
	},
	category: {
		"type": ObjectId,
		"ref": "Category"
	},
	createTime: String,
	lastUpdate: String
});

module.exports = schema;
