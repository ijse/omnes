
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

var schema = mongoose.Schema({
	name: String,
	pass: String,
	email: String
});

schema.statics.login = function(uname, upass) {
	return this.find({
		name: uname,
		pass: upass
	});
};

module.exports = schema;
// module.exports = mongoose.model("User", schema);
