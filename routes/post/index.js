/**
 * 目录树Controller
 */
var modelMgr = require("../../models");
var Post = modelMgr.getModel("Post");

module.exports = function(app, path) {

	//====
	//Get post list by category id
	app.get(path + "/list", function(req, res, next) {
		// NOTE: Get categoryId
		var categoryId = req.params.categoryId;
		Post.find({"category._id": categoryId })
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
		Post.create({
			title: "Untitled",
			content: "Untitled\n===\n",
			author: author,
			category: categoryid,
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

		var postModel = new Post(post);
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