
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/* Start my code  */

// Make a database connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/snapcat');

// Define our data model
var models = require('./models');
var CatModel = models.defineCat(mongoose);

app.get('/', routes.index);
app.get('/users', user.list);

var catmin = require('./routes/catmin');
app.get('/catmin', catmin.listCats(CatModel));
app.get('/catmin/add', catmin.displayAddCatForm());
app.post('/catmin/add', catmin.addCat(CatModel));
app.get('/catmin/delete/:id', catmin.deleteCat(CatModel));

// Services
var services = require('./routes/services');
app.get('/cats', services.getCats(CatModel));
app.get('/cats/:id', services.getCat(CatModel));



http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
