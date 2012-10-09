
/**
 * Some Configuration to Express
 */
var mongoose = require('mongoose');
// Default mongo server
var dburl = "mongodb://omnes:omnes@ds037827.mongolab.com:37827/omnes";

var express = require('express');
var app = express();

app.configure(function(){
  app.set('nodeport', process.env.NODEPORT || 3001);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  // app.set('view options', {
  //     open: '{{',
  //     close: '}}'
  // });
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({
      secret: "Omnes Project"
  }));
  app.use(express.methodOverride());
  app.use(function(req, res, next) {
    res.locals({
      "Session": req.session
    });
    next();
  });
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.log = require("sys").log;

app.configure('development', function(){
  // Develop mongo server for test
  dburl = "mongodb://localhost:27017/Omnes";
  app.use(express.errorHandler());
});


// Create connection
mongoose.connect(dburl);
// Exit when connect fail
mongoose.connection.on("error", function() {
  console.error("[ERROR]: MongoDB connect failed!!");
  process.exit(-1);
});
mongoose.connection.once("open", function() {

});


module.exports = app;

require("./routes");
