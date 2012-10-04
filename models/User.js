
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

var schema = mongoose.Schema({
	name: String,
	pass: String,
	email: String
});

schema.methods.login = function(uname, upass) {
	
};

module.exports = schema;
