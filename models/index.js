/**
 * 获取Model, Mongoose对象
 */

//var db = require("../db");
var db = require("mongoose").connection;
exports.getModel = function(modelName) {
	var schema = require("./" + modelName);
	var model = db.model(modelName, schema);
	return model;
};