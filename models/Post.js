var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

var schema = mongoose.Schema({
	title: String,
	content: String,
	createTime: String,
	lastUpdate: String
});

schema.statics.login = function(uname, upass) {
	return this.find({
		name: uname,
		pass: upass
	});
};

module.exports = schema;
