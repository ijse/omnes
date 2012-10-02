var db = require("../db");
var ModelMgr = require("../models");

// test Category Model

var category = ModelMgr.getModel("Category");

category.find({parentId:"root"}, function(err, list) {
	console.log(arguments);
});

db.close();
