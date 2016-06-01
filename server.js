var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cfenv = require('cfenv');

app.use(express.static('public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine' , 'jsrender');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodi

app.use(session({ secret: 'keyboard cat' }));
app.all('/:var',function (request, response, next) {
	var sess=request.session;
	console.log(request.params.var);
  if(sess.name||request.params.var=='login'){
  	console.log("logged user");
  	next();
  }
  else
  	require("./requestHandlers").login(request,response);
});




function start(route,handle){
	var multer  = require('multer');
	
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


	app.get('/:var', function (request, response) {

	  	route(handle,'/'+request.params.var,request, response);
	});

	var appEnv = cfenv.getAppEnv();
	
	app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
}

exports.start = start;