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
		
		var arr = res.body;
		if(!(arr instanceof Array)) {
			arr = [arr];
		}

		


		arr.every(function(val, index, arr) {
			var model = new Category(req.body);
			model.save(function(err) {
				if(err) {
					res.send({
						success: false,
						error: "Some Error Happened"
					});
				} else {
					res.send({
						success: true
					});
				}
			});
		});
	});

};
