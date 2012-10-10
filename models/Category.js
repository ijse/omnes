
var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
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
	},
	author: {
		"type": ObjectId,
		"ref": "User"
	}
});

schema.methods.test = function() {
	console.log("test");
};

module.exports = schema;
// module.exports = mongoose.model("Category", schema);
