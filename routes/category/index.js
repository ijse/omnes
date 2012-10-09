/**
 * 目录树Controller
 */
var modelMgr = require("../../models");
var Category = modelMgr.getModel("Category");

module.exports = function(app, path) {
	
	/**
	 * Get categories
	 */
	app.get(path + "/list", function(req, res) {
		var node = req.param("node");
		console.log("node: ", node);	
		//res.sendfile("data/category/list.json");
		//res.send("OK!! that works!!");
		Category.find({ parentId:node }, function(err, clist) {
			res.send(clist);
		});
	});

	/**
	 * Save categories or folder
	 */
	app.post(path + "/save", function(req, res) {
		var arr = req.body;
		if(!(arr instanceof Array)) {
			arr = [arr];
		}
		var count = arr.length;
		arr.forEach(function(doc) {
			doc._id = null;
			doc.lastModify = new Date();
			Category.create(doc, function(err) {
				if(err) {
					next(err);
				} else if(--count === 0) {
					res.send({ success: true });
				}
			});
		});
	});

	/**
	 * Update(Rename, sort) tree nodes
	 */
	app.post(path + "/update", function(req, res) {
		var arr = req.body;
		if(!(arr instanceof Array)) {
			arr = [arr];
		}
		var count = arr.length;
		arr.forEach(function(doc) {
			Category.findByIdAndUpdate(doc._id, {title: doc.title, lastModify: new Date() }, function(err) {
				if(err) {
					next(err);
				} else if(--count === 0) {
					res.send({ success: true });
				}
			});
		});
	});

	/**
	 * Delete a item or folder
	 */
	app.post(path + "/delete", function(req, res) {
		var arr = req.body;
		if(!(arr instanceof Array)) {
			arr = [arr];
		}

		var count = arr.length;
		arr.forEach(function(doc) {
			console.log("delete _id: ", doc._id);
			Category.findByIdAndRemove(doc._id, function(err) {
				console.log(err, "|", count);
				if(err) {
					next(err);
				} else if(--count === 0) {
					res.send({ success: true });
				}
			});
		});
		
	});
};
