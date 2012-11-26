var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Omnes");
var db = mongoose.connection;
var assert = require("assert");

var ModelMgr = require("../models");
var ObjectId = mongoose.Schema.Types.ObjectId;

var CategoryModel = ModelMgr.getModel("Category");
var UserModel = ModelMgr.getModel("User");
var PostModel = ModelMgr.getModel("Post");

ModelMgr.initModels();

db.on("open", function() {

	// test Category Model

	// var Category = ModelMgr.getModel("Category");

	// var ObjectId = require("mongoose").Types.ObjectId;
	// var id = ObjectId("506c8ae88f1fe7b81f000001");

	// Category.findById("506c91b3a2480ea41f000001", {}, function() {
	//	console.log(arguments);
	// });
	var iuser = UserModel.findOne({ name: "ijse" }, function(err, user) {

		PostModel.create({
			title: "this is title",
			content: "this is content...",
			author: user._id,
			createTime: new Date(),
			lastUpdate: new Date()
		}, function(err) {
			console.log("finish");
			console.log(err);
		});
	});



});

