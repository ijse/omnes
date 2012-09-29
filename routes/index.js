/*
 * GET home page.
 */
var CategoryController = require("./category");
var modelMgr = require("../models");
var app = require("../app");
var path = "";

app.get(path + "/", function(req, res) {
	res.redirect("/index.html");
});

app.get(path + "/testdb", function(req, res) {
	// var modelsMgr = app.get("models");
	var Category = modelMgr.getModel("Category");
	var ct = new Category({
		_id: null,
		parentId: null,
		leaf: true,
		title: "ceshi!!"
	});
	ct.save(function() {
		console.log("save to db: ", arguments);
	});

	res.send("Finish!!");
});

CategoryController(app, "/category");
