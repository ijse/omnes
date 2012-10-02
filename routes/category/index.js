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
		//res.sendfile("data/category/list.json");
		//res.send("OK!! that works!!");
		Category.find(function(err, clist) {
			res.send(clist);
		});
	});

	app.post(path + "/add", function(req, res) {
		var arr = req.body;
		if(!(arr instanceof Array)) {
			arr = [arr];
		}

		for( var i = 0; i<arr.length; i++ ) {
			var val = arr[i];
			delete val._id;
			var model = new Category(val);
			model.save();
		}

		res.send({
			success: true
		});
	});

};
