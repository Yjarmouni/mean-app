var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');


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

	app.post('/upload',multer({ dest: 'views/photos/'}).single('avatar'), function (request, response){
			console.log(request.file); //form fields
			var photo="photos/"+request.file.filename;
		handle["uploadPost"](request,response,photo);
	});

	app.post('/login',function (request, response){
		
		handle["loginPost"](request,response);
	});


	app.get('/:var', function (request, response) {
		console.log("server "+request.body)
	  	route(handle,'/'+request.params.var,request, response);
	});

	app.listen(3000, function () {
		console.log('listening on port 3000 !')
	});
}

exports.start = start;