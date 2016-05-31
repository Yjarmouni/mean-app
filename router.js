function route(handle,pathname,request, response) {
	console.log("here");
	console.log("About to route a request for : " + pathname);
	if(typeof handle[pathname]  === 'function' ){
		handle[pathname](request, response);
	}
	else {
		console.log("No request handler for pathname : "+ pathname);
		response.writeHead(404,{"ContentType" : "text/html"});
		response.write("404 : Ressources not found");
		response.end();
				}

	// body...
}

exports.route = route;