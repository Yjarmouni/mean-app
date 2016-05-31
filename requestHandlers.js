var exec = require("child_process").exec;
var fs = require('fs');
var jsrender = require('jsrender');
var User = require("./models.js").User;

var tmpl;

function start(request,response) {
	console.log("Request handler 'start' was called.");
	tmpl = jsrender.templates('./views/index.html');
	var name="";
	var sess=request.session;
	if(sess.name)
		name=sess.name+" <a href='/logout'>logout</a>";
	html = tmpl.render({name : name});	
	response.send(html);
	response.end();
	
}

function uploadPost(request,response,photo){
	console.log("Request handler uploadPost was called");
	tmpl = jsrender.templates('./views/model.html');
	var content="<img src='"+photo+"'></img>";
	var html = tmpl.render({content: content});
	response.send(html);
	response.end();

}
function upload(request, response) {
	console.log("Request handler ' upload ' was called");
	tmpl = jsrender.templates('./views/up.html');
	var html = tmpl.render({param: "Jim",ss : "ok bye"});
	response.send(html);
	response.end();
	
}

function find(request, response) {
	exec("find /",
		{setTimeout : 10000 , maxBuffer : 20000*1024 },
		function(error,stdout,stderr){
			response.writeHead(200,{"Content-Type":"text/plain"});
			response.write(stdout);
			response.end();
		});
}

function show(request, response) {
	console.log("Request handler ' show ' was called");
	response.writeHead(200,{"ContentType" : "text/html"});
	response.write("hello show");
	response.end();
}

function loginPost(request,response) {
	var html;
	User.findOne(request.body,function (err, user) {
		
		if(!user){
			tmpl = jsrender.templates('./views/login.html');
			html = tmpl.render({message :"Username or password incorrect"});
		}	
		else{
			sess=request.session;
			sess.name=user.name;
			tmpl = jsrender.templates('./views/index.html');
			html = tmpl.render({name : sess.name});
				}
		response.send(html);
		response.end();
	});
}

function login(request, response) {
	console.log("Request handler ' login ' was called");
	tmpl = jsrender.templates('./views/login.html');
	var html = tmpl.render();
	response.send(html);
	response.end();
}


function logout(request, response) {
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
exports.loginPost=loginPost;