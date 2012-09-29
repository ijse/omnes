
/**
 * 与MongoDB建立连接
 */
var mongoose = require('mongoose');
module.exports = mongoose.createConnection('localhost', 'Omnes');