/**
 * 获取Model, Mongoose对象
 */
var fs = require("fs");
var path = require("path");

var mongoose = require("mongoose");
exports.getModel = function(modelName) {
	var schema = require("./" + modelName);
	var model = mongoose.model(modelName, schema);
	return model;
};

exports.ObjectId = mongoose.Schema.Types.ObjectId;

exports.initModels = function() {
	var modelList = [
		"Category",
		"User",
		"Post"
	];
	modelList.forEach(function(item, index, list) {
		exports.getModel(item);
	});
	// var files = fs.readdirSync(__dirname);
	// files.forEach(function(item, index, list) {
	// 	var modelName = path.basename(item).replace(".js", "");
	// 	if(path.basename(item) != "index") {
	// 		var schema = require("./" + modelName);
	// 		mongoose.model(modelName, schema);
	// 	}
	// });
};