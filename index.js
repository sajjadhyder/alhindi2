var express = require('express');
const bodyParser= require('body-parser');
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
app.use(bodyParser.urlencoded({extended: true}));

//--------database---------------
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://heroku_n9kwrtp6:1k04jvroh2k30rum37bt57l4ec@ds019950.mlab.com:19950/heroku_n9kwrtp6';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);
    // do some work here with the database.
            
            
        }   
     
    //Close connection
    db.close();
  });
//--------database---------------

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "/pages/index.html");
});

app.set('port', (process.env.PORT || 5000));

app.use("/",router);
app.use('/public', express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/index2', function(request, response) {
  response.render('pages/index2');
});
app.get('/thanks', function(request, response) {
  response.render('pages/thanks');
});
app.get('/introduction', function(request, response) {
  response.render('pages/introduction');
});
app.get('/message-from-management', function(request, response) {
  response.render('pages/message');
});
app.get('/login', function(request, response) {
  response.render('pages/login');
});
app.get('/services', function(request, response) {
  response.render('pages/services');
});
app.get('/services/civil', function(request, response) {
  response.render('pages/civil');
});
app.get('/services/hvac', function(request, response) {
  response.render('pages/hvac');
});
app.get('/services/maintenance', function(request, response) {
  response.render('pages/maintenance');
});

app.get('/services/electrical', function(request, response) {
  response.render('pages/electrical');
});
app.get('/services/fire-protection-and-piping', function(request, response) {
  response.render('pages/fire-protection-and-piping');
});
app.get('/services/steel-fabrication', function(request, response) {
  response.render('pages/steel-fabrication');
});
app.get('/services/contracting', function(request, response) {
  response.render('pages/contracting');
});
app.get('/services/manpower', function(request, response) {
  response.render('pages/manpower');
});
app.get('/services/materials-equipment-tools', function(request, response) {
  response.render('pages/materials-equipment-tools');
});
app.get('/about-us/vision-and-mission', function(request, response) {
  response.render('pages/vision-and-mission');
});




app.get('/services/insulation', function(request, response) {
  response.render('pages/insulation');
});
app.get('/services/painting-and-coating', function(request, response) {
  response.render('pages/painting-and-coating');
});
app.get('/services/surface-preparation-and-coating', function(request, response) {
  response.render('pages/surface-preparation-and-coating');
});
app.get('/services/other-services', function(request, response) {
  response.render('pages/other-services');
});
app.get('/contact', function(request, response) {
  response.render('pages/contact');
});
app.post('/contact-form', (req, res) => {
	//--------database---------------
	var mongodb = require('mongodb');

	//We need to work with "MongoClient" interface in order to connect to a mongodb server.
	var MongoClient = mongodb.MongoClient;

	// Connection URL. This is where your mongodb server is running.
	var url = 'mongodb://heroku_n9kwrtp6:1k04jvroh2k30rum37bt57l4ec@ds019950.mlab.com:19950/heroku_n9kwrtp6';

	// Use connect method to connect to the Server
	MongoClient.connect(url, function (err, db){
	  if (err) {
	    console.log('Unable to connect to the mongoDB server. Error:', err);
	  } else {
    // do some work here with the database.
     	db.collection('cocofino', function (err, collection) {

     	collection.insert({ Name: req.body.name, Email: req.body.email, Mobile: req.body.mobile, message: req.body.message });
        });   

     }
    //Close connection
    db.close();
  });
	
	res.redirect('/thanks');

//--------database---------------
});

app.post('/login', (req, res) => {
	var Name= req.body.name;
	var pass = req.body.password;
 	if (Name=='admin' && pass=='root' ){
		res.redirect('/list');
 	}else{
 		res.send("Invalid data");
 	}

//--------database---------------
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


