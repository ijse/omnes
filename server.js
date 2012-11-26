/**
 *  启动!!
 */
var app = require("./app");
var http = require('http');

var port = app.get('node_port') || 3000;
http.createServer(app).listen(port, function(){
	console.log("Omnes server listening on port " + port);
});
