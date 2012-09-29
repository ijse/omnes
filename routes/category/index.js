/**
 * 目录树Controller
 */
var modelMgr = require("../../models");
var Category = modelMgr.getModel("Category");

module.exports = function(app, path) {

	app.get(path + "/list", function(req, res) {
		//res.sendfile("data/category/list.json");
		//res.send("OK!! that works!!");
		console.log("=========........==========");
		Category.find(function(err, clist) {
			res.send(clist);
		});
	});

	app.post(path + "/add", function(req, res) {
		
		var arr = req.body;
		console.log("arr>>", arr);
		if(!(arr instanceof Array)) {
			arr = [arr];
		}

		for( var i = 0; i<arr.length; i++ ) {
			var val = arr[i];
			console.log(val);
			var model = new Category(val);
			model.save();
		}

		res.send({
			success: true
		});
	});

};
