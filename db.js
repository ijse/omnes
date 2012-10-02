
/**
 * 与MongoDB建立连接
 */
var mongoose = require('mongoose');
var dbcon = mongoose.createConnection('localhost', 'Omnes');

dbcon.once("error", function() {
	console.error("[ERROR]: MongoDB connect failed!!");
	process.exit(-1);
});

module.exports = dbcon;
