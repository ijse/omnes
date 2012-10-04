var modelMgr = require("../../models");
var UserModel = modelMgr.getModel("User");

module.exports = function(app, path) {

	// User sign in
	app.post(path + "/signin", function(req, res) {
		var uname = req.param("name"),
			upass = req.param("pass"),
			vpass = req.param("pass2"),
			email = req.param("email");
		var response = { success: false };
		//TODO: validate
		//
		console.log(req.body.pass, upass, vpass, email);
		UserModel.create({
			name: uname,
			pass: upass,
			email: email
		}, function(err) {
			response.success = !!!err;
			res.send(response);
		});

	});

	// User login
	app.post(path + "/login", function(req, res) {
		var uname = req.param("name"),
			upass = req.param("pass");
		var response = { success: false };
		UserModel.findOne({
			name: uname,
			pass: upass
		}, function(err, doc) {
			response.success = !!doc;
			if(!!doc) {
				req.session.user = doc;
			}
			res.send(response);
		});
	});



}