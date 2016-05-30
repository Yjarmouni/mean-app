var express = require('express');
var app = express();



//app.use(express.static(__dirname + '/public'));
//app.set('views', __dirname + '/views');
//app.use('views/photos', express.static(__dirname +'/views/photos'));
app.use(express.static('views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine' , 'jsrender');


function start(route,handle){
	var multer  = require('multer');


	app.get('/', function (request, response) {
	  	route(handle,'/',response);
	});

	app.post('/upload',multer({ dest: 'views/photos/'}).single('avatar'), function (request, response){
			console.log(request.file); //form fields

		handle["uploadPost"](request,response,"photos/"+request.file.filename);

	});



	app.get('/:var', function (request, response) {
		
	  	route(handle,'/'+request.param('var'),response);
	});

	app.listen(3000, function () {
	});
}

exports.start = start;