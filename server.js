var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var multer  = require('multer');


app.use(express.static('public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine' , 'jsrender');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(session({ secret: 'keyboard cat' }));
app.all('/:var',function (request, response, next) {
	var sess=request.session;
  	if(sess.name||request.params.var=='login'||request.params.var=='register'){
  		next();
  	}
  	else
  		require("./requestHandlers").login(request,response);
});


function start(route,handle){
	
	app.get('/', function (request, response) {
	  	route(handle,'/',request, response);
	});

	app.post('/upload',multer({ dest: 'public/photos/'}).single('avatar'), function (request, response){
		var photo="photos/"+request.file.filename;
		handle["uploadPost"](request,response,photo);
	});

	app.post('/login',function (request, response){
		handle["loginPost"](request,response);
	});

	app.post('/register',function (request, response){
		handle["registerPost"](request,response);
	});


	app.get('/:var', function (request, response) {
	  	route(handle,'/'+request.params.var,request, response);
	});

	app.listen(8000, function () {
		console.log('listening on port 8000 !');
	});
}

exports.start = start;