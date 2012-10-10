/**
 * 目录树Controller
 */
var modelMgr = require("../../models");
var User = modelMgr.getModel("User");
var Category = modelMgr.getModel("Category");

module.exports = function(app, path) {
	
	/**
	 * Get categories
	 */
	app.get(path + "/list", function(req, res) {
		var node = req.param("node");
		Category.find({ parentId:node })
				.populate("author")
				.exec(function(err, clist) {
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
			doc.author = req.session.user._id;
			Category.create(doc, function(err, doc) {
				if(err) {
					next(err);
				} else if(--count === 0) {
					res.send({ success: true, data: doc });
				}
			});
		});
	});

	/**
	 * Update(Rename, sort) tree nodes
	 */
	app.post(path + "/update", function(req, res, next) {
		var arr = req.body;
		if(!(arr instanceof Array)) {
			arr = [arr];
		}
		var count = arr.length;
		arr.forEach(function(doc) {
			console.log(doc);
			var mod = Category.findById(doc._id, function(err, mod) {
				if(err || !mod) {
					// Error or none
					res.send({ success: false });
					return ;
				}
				mod.title = doc.title;
				mod.lastModify = new Date();
				mod.increment();
				mod.save(function(err) {
					if(err) {
						next(err);
					} else if(--count === 0) {
						res.send({ success: true });
					}
				});
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
