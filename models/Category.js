
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

var schema = mongoose.Schema({
	parentId: String,
	title: String,
	leaf: Boolean,
	lastModify: {
		"type": Date
	},
	sortNo: {
		"type": Number,
		"default": 0
	}
});

schema.methods.test = function() {
	console.log("test");
};

module.exports = schema;
