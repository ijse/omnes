
var mongoose = require("mongoose");

var schema = mongoose.Schema({
	_id: "string",
	id: "string",
	parentId: "string",
	title: "string",
	leaf: "boolean"
});

schema.methods.test = function() {
	console.log("test");
};

module.exports = schema;
