/*
 * GET home page.
 */
var modelMgr = require("../models");
var app = require("../app");
var path = "";

var CategoryController = require("./category");
var UserController = require("./user");


app.get(/\/(index|index.html|index.htm)?$/, function(req, res) {
	// res.redirect("/index.html");
	res.render("index", {
		logined: !!req.session.user
	});
});

app.get("/frags/:fragName", function(req, res) {
	var fragName = req.param("fragName");
	res.sendfile("views/frags/" + fragName);
})

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

app.get(path + "/testDel", function(req, res) {
	var Category = modelMgr.getModel("Category");
	Category.findOneAndRemove({ _id: '506c7c09a2e207a41d000001' }, function(err, result) {
		console.log(arguments);
		res.send({ success: true });
	});
})

UserController(app, "/user");
CategoryController(app, "/category");