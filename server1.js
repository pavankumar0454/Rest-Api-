
//here we are dedclaring modules we are using from npm
var express= require('express');
var bodyParser= require('body-parser');
var app= express();
var MongoClient= require('mongodb').MongoClient;
var db;

// step-3 by adding body-parser the application can access to read the file
//and here we are adding mongodb server to store the post data

app.use(bodyParser.urlencoded({extended: true}));
MongoClient.connect('mongodb://pavankumar0454:pavan0454@ds149353.mlab.com:49353/pavandb', function(err, database){
  if (err) return console.log(err)
 db= database
});

// to get information as html file step-1
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index1.html');
  console.log('by using get');
});

// step-4 the info stored in mongodb can access to view at /quote path by using this code
app.get('/quote', function(req, res){
  db.collection('quote').find().toArray(function(err, result){ 
    res.json(result);
    console.log(result);
});
});

//step-2 To send info to database
app.post('/quote', function(req, res){
  db.collection('quote').save(req.body,(err, result) => {
  	if(err) return console.log(err);
  	console.log('saved to database');
  	res.redirect('/')
  });
});

app.listen(1000, function(){
	console.log('port listening to 1000');
});