var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Omnes");
var db = mongoose.connection;

db.on("open", function() {
	var ModelMgr = require("../models");

	// test Category Model

	var Category = ModelMgr.getModel("Category");

	// Category.find({parentId:"root"}, function(err, list) {
	// 	console.log(arguments);
	// });
	var ObjectId = require("mongoose").Types.ObjectId;
	var id = ObjectId("506c8ae88f1fe7b81f000001");

	console.log(id);

	Category.findById("506c91b3a2480ea41f000001", {}, function() {
		console.log(arguments);
	});

});

