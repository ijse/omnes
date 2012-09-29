/**
 *  启动!!
 */
var app = require("./app");
var http = require('http');
require("./routes");

http.createServer(app).listen(app.get('nodeport'), function(){
  console.log("Omnes server listening on port " + app.get('nodeport'));
});