function route(handle,pathname,request, response) {	
	if(typeof handle[pathname]  === 'function' ){
		handle[pathname](request, response);
	}
	else {
		console.log("No request handler for pathname : "+ pathname);
		response.writeHead(404,{"ContentType" : "text/html"});
		response.write("404 : Ressources not found");
		response.end();
	}
}

exports.route = route;