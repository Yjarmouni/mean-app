var express = require('express');
var app = express();

function start(route,handle){
	app.get('/', function (request, response) {
	  	route(handle,'/',response);
	});
	app.get('/:var', function (request, response) {
		
	  	route(handle,'/'+request.param('var'),response);
	});

	app.listen(3000, function () {
	});
}

exports.start = start;