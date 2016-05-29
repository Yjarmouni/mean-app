var http = require("http");
var url = require("url");

var express = require('express');
var app = express();

function start(route,handle){
	function onRequest(request,response){
		var pathname = url.parse(request.url).pathname;
		console.log("Request for ( "+pathname+" ) received.");
		route(handle,pathname,response);
		/*response.writeHead(200,{"Content-Type":"text/plain"});
		response.write(content);
		response.end();*/
	}
	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}



app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));

app.get('/awesome', function(req, res) {
  if(req.session.lastPage) {
    res.write('Last page was: ' + req.session.lastPage + '. ');
  }

  req.session.lastPage = '/awesome';
  res.send('Your Awesome.');
});
exports.start = start;