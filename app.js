
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    http = require('http');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
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

app.get('/', routes.index);

app.get('/data/category.do', function(req, resp) {
  if(req.param("id") == "root") {
    resp.json([
        { text: "sub1", id:"xxx" },
        { text: "sub11", leaf: true  }
      ]
    );
  } else {
    resp.json([{text: "sss", leaf: true }, {text: "sub2", leaf: true },
          {text: "sub3", leaf: true }]);
  }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
