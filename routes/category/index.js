/**
 * 目录树Controller
 */
var modelMgr = require("../../models");
var Category = modelMgr.getModel("Category");

module.exports = function(app, path) {
	
	/**
	 * 获取某个结点下的子结点
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

	app.post(path + "/save", function(req, res) {
		var arr = req.body;
		if(!(arr instanceof Array)) {
			arr = [arr];
		}
		var i = 0;
		for(; i<arr.length; i++ ) {
			var val = arr[i];
			val._id = null;
			var model = new Category(val);
			model.save();
		}

		res.send({
			success: true
		});
	});

	app.post(path + "/delete", function(req, res) {
		var arr = req.body;
		if(!(arr instanceof Array)) {
			arr = [arr];
		}
		var i = 0;
		for(; i<arr.length; i++) {
			var val = arr[i];
			Category.find({ "_id": val._id}, function(err, model) {
				if(!err) {
					model.remove(function(err2) {
						if(!err2) 
							res.send({ success: true });
						else
							res.send({ success: false });
					});
				} else {
					res.send({ success: false });	
				}
			});
		};
		
	});
};
