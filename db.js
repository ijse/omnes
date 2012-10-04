
/**
 * 与MongoDB建立连接
 * 
 * @deprecated
 */
var mongoose = require('mongoose');
// var dburl = "mongodb://omnes:omnes@ds037827.mongolab.com:37827/omnes";
var dburl = "mongodb://localhost:27017/Omnes";
//var dbcon = mongoose.createConnection(dburl);
mongoose.connect(dburl);

var dbcon = mongoose.connection;

dbcon.once("error", function() {
	console.error("[ERROR]: MongoDB connect failed!!");
	process.exit(-1);
});

module.exports = dbcon;
