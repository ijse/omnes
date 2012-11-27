/**
 * 目录树Controller
 */
var modelMgr = require("../../models");
var PostModel = modelMgr.getModel("Post");
var CategoryModel = modelMgr.getModel("Category");
var UserModel = modelMgr.getModel("User");

module.exports = function(app, path) {

	//====
	//Get post list by category id
	app.get(path + "/list", function(req, res, next) {
		console.log("-------");
		// NOTE: Get categoryId
		var categoryId = req.params.categoryId;
		PostModel.find({"category._id": categoryId })
			.populate("author")
			.populate("category")
			.exec(function(err, doc) {
				res.json({
					success: true,
					data: doc
				});
			});
	});

	//====
	//Create an empty post
	app.post(path + "/add", function(req, res, next) {
		var d = new Date();
		var vpost = req.param("post");

		// Get author
		var author = req.session.user;

		// Get category
		var categoryId = req.param("caregoryId");

		// Create an empty post model
		PostModel.create({
			title: "Untitled",
			content: "Untitled\n===\n",
			author: author,
			category: modelMgr.ObjectId(categoryId),
			createTime: d,
			lastUpdate: d
		}, function(err, doc) {
			res.json({
				success: !!!err,
				data: doc
			});
		});
	});

	//=====
	//Save or update post
	app.post(path + "/save", function(req, res, next) {
		var post = req.param("post");
		post.lastUpdate = new Date();

		var postModel = new PostModel(post);
		postModel.save(function(err, doc) {
			res.json({
				success: !!!err,
				data: doc
			});
		});
	});

	//=====
	//Delete an post

};