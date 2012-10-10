/**
 * 获取Model, Mongoose对象
 */

//var db = require("../db");
var mongoose = require("mongoose");
exports.getModel = function(modelName) {
	var schema = require("./" + modelName);
	var model = mongoose.model(modelName, schema);
	return model;
};