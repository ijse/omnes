/**
 * Test Suite
 */
var assert = require("assert");
var mongoose = require("mongoose");
var assert = require("assert");

var ModelMgr = require("../models");
var CategoryModel = ModelMgr.getModel("Category");
var UserModel = ModelMgr.getModel("User");
var PostModel = ModelMgr.getModel("Post");

// Global variables
var ObjectId = mongoose.Schema.Types.ObjectId;
var user, category, post;

before(function() {
	mongoose.connect("mongodb://localhost:27017/Omnes");
});

describe("Mongoose", function() {
	it("should connect to database", function(done) {
		mongoose.connection.on("open", done);
	});
});

describe("UserModel", function() {
	it("should add a User which name is ijse", function(done) {
		var User = new UserModel({
			name: "ijse",
			pass: "ijse123",
			email: "i@ijser.cn"
		});
		User.save(done);
	});

	it("should find one user", function(done) {
		UserModel.findOne({name: "ijse"}, function(err, doc) {
			user = doc;
			if(!err && doc) {
				done();
			}
		});
	});
});

describe("CategoryModel", function() {
	it("add one more category for test", function(done) {
		CategoryModel.create({
			parentId: "",
			title: "test:Test Category",
			leaf: "true",
			lastModify: new Date(),
			sortNo: 0,
			author: user
		}, done);
	});

	it("find one category", function(done) {
		CategoryModel.findOne({
			title: "test:Test Category"
		}, function(err, doc) {
			category = doc;
			if(!err && doc) { done(); }
		});
	});

});


describe("PostModel", function() {
	it("should add a Post", function(done) {
		PostModel.create({
			title: "test:A new post",
			content: "Post content",
			author: user,
			category: category,
			lastUpdate: new Date(),
			createTime: new Date()
		}, done);
	});

	it("create a post with category id", function(done) {
		PostModel.create({
			title: "test:Another new post",
			content: "created with category id",
			author: user,
			category: category._id,
			lastUpdate: new Date(),
			createTime: new Date()
		}, done);
	});

	it("find a post by category id", function(done) {
		PostModel
			.find({
				"category": category._id
			})
			.populate("category")
			.populate("author")
			.exec(function(err, doc) {
				if(!err && doc.length) {
					done();
				}
			});
	});

	it("find anther post with title=test:Another new post", function(done) {
		PostModel
			.find({
				"title": "test:Another new post"
			})
			.exec(function(err, doc) {
				if(!err && doc.length) {
					done();
				}
			});
	});

});



after(function() {
	// Do some clean stuffs
	it("should delete all users just add, which name is ijse", function(done) {
		UserModel.remove({name: "ijse"}, done);
	});
	it("should delete all posts just add, which title start with test", function(done) {
		PostModel.remove({ title: /^test/ }, done);
	});
	it("should delete all categories just add, which title start with test", function(done) {
		CategoryModel.remove({ title: /^test/ }, done);
	});
});