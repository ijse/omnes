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
		// NOTE: Get categoryId
		var categoryId = req.param("categoryId");

		if(categoryId === "root") {
			res.json({
				success: true,
				data: []
			});
			return ;
		}

		PostModel.find({"category": categoryId })
			.populate("author")
			.populate("category")
			.exec(function(err, doc) {
				console.log(categoryId, "====", doc.length);
				res.json({
					success: true,
					posts: doc
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
		console.log(author);

		// Get data
		var title = req.param("title");
		var categoryId = req.param("category");

		// Create an empty post model
		PostModel.create({
			title: title,
			content: "Untitled\n===\n",
			author: author._id,
			category: categoryId,
			createTime: d,
			lastUpdate: d
		}, function(err, doc) {
			res.json({
				success: !!!err,
				posts: doc
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