
/**
 * Some Configuration to Express
 */

var express = require('express'),
    routes = require('./routes');

var app = module.exports = express();

app.configure(function(){
  app.set('nodeport', process.env.NODEPORT || 3001);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// ~~
routes(app, "");


