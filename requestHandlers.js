var exec = require("child_process").exec;
var fs = require('fs');



function start(response){
	console.log("Request handler 'start' was called.");
	setTimeout( function(){
		response.writeHead(200,{"Content-Type":"text/plain"});
		response.write("Hello start");
		response.end();
	},6000);
}

function find(response){
	console.log("Request handler 'upload' was called.");
	exec("find /",
		{setTimeout : 10000 , maxBuffer : 20000*1024 },
		function(error,stdout,stderr){
			response.writeHead(200,{"Content-Type":"text/plain"});
			response.write(stdout);
			response.end();
		});
}

function upload(response){
	console.log("Request handler 'find' was called.");
	response.writeHead(200,{"Content-Type":"text/plain"});
	response.write("Hello upload");
	response.end();
}

function show(response){
	console.log("Request handler 'show' was called.");
	response.writeHead(200,{"Content-Type":"text/plain"});
	response.write("Hello show");
	response.end();
}

function login(response){
	console.log("Request handler 'login' was called.");
	fs.readFile('./login.html', function (err, html) {
	    if (err) {
	        throw err; 
	    }       
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
   });

}

function logout(response){
	console.log("Request handler 'logout' was called.");
	response.writeHead(200,{"Content-Type":"text/plain"});
	response.write("Hello logout");
	response.end();
}

 exports.start = start ;
 exports.upload = upload ;
 exports.find = find ;
 exports.show = show ;
 exports.login = login ;
 exports.logout = logout ;