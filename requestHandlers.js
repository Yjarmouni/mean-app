var exec = require("child_process").exec;
var fs = require('fs');
var jsrender = require('jsrender');

var tmpl;

function start(response) {
	console.log("Request handler 'start' was called.");
	
	
}

function uploadPost(request,response,photo){
	console.log("Request handler uploadPost was called");
	tmpl = jsrender.templates('./views/model.html');
	var content="<img src='"+photo+"'></img>";
	var html = tmpl.render({content: content});
	response.send(html);
	response.end();

}
function upload(response) {
	console.log("Request handler ' upload ' was called");
	tmpl = jsrender.templates('./views/up.html');
	var html = tmpl.render({param: "Jim",ss : "ok bye"});
	response.send(html);
	response.end();
	
}

function find(response) {
	exec("find /",
		{setTimeout : 10000 , maxBuffer : 20000*1024 },
		function(error,stdout,stderr){
			response.writeHead(200,{"Content-Type":"text/plain"});
			response.write(stdout);
			response.end();
		});
}

function show(response) {
	console.log("Request handler ' show ' was called");
	response.writeHead(200,{"ContentType" : "text/html"});
	response.write("hello show");
	response.end();
}

function login(response) {
	console.log("Request handler ' login ' was called");
	response.writeHead(200,{"ContentType" : "text/html"});
	response.write("hello login");
	response.end();
}

function logout(response) {
	console.log("Request handler ' logout ' was called");
	response.writeHead(200,{"ContentType" : "text/html"});
	response.write("hello logout");
	response.end();
}

exports.start = start;
exports.upload = upload;
exports.find = find;
exports.show= show;
exports.login=login;
exports.logout=logout;
exports.uploadPost=uploadPost;
