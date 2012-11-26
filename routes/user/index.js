var modelMgr = require("../../models");
var UserModel = modelMgr.getModel("User");

module.exports = function(app, path) {
	var regs = {
		name: /^[A-Za-z0-9_\-\u4e00-\u9fa5]{2,10}$/,
		pass: /^[0-9A-Za-z\-_]{4,11}$/,
		email: /\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/
	};

	// User sign in
	app.post(path + "/signin", function(req, res) {
		var uname = req.param("name").trim(),
			upass = req.param("pass").trim(),
			vpass = req.param("pass2").trim(),
			email = req.param("email").trim();
		var response = {
			success: false
		};

		//TODO: validate
		//
		if (!regs.name.test(uname)) {
			response.error = "Username invalid!";
			res.send(response);
			return;
		} else if (!regs.pass.test(upass) || upass !== vpass) {
			response.error = "Password invalid or not match!";
			res.send(response);
			return;
		} else if (!regs.email.test(email)) {
			response.error = "Email invalid!";
			res.send(response);
			return;
		}

		UserModel.create({
			name: uname,
			pass: upass,
			email: email
		}, function(err) {
			response.success = !! !err;
			// Auto login
			UserModel.login(uname, upass).exec(function(err, doc) {
				if (!!doc[0]) {
					response.success = true;
					req.session.user = doc[0];
				}
				res.send(response);
			});
		});

	});

	// User logout
	app.get(path + "/logout", function(req, res) {
		delete req.session.user;
		res.redirect("/");
	});

	// User login
	app.post(path + "/login", function(req, res) {
		var uname = req.param("name").trim(),
			upass = req.param("pass").trim();
		var response = {
			success: false,
			error: "Username or password invalid!"
		};

		if (!regs.name.test(uname) || !regs.pass.test(upass)) {
			res.send(response);
			return;
		}

		UserModel.login(uname, upass).exec(function(err, doc) {
			if (!!doc[0]) {
				response.success = true;
				// Note: Session name: user
				req.session.user = doc[0];
			}
			res.send(response);
		});
	});



};