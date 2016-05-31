var exec = require("child_process").exec;
var fs = require('fs');
var jsrender = require('jsrender');
var User = require("./models.js").User;

var tmpl;

function start(request,response) {
	tmpl = jsrender.templates('./views/index.html');
	var name="";
	var sess=request.session;
	if(sess.name)
		name="<a href='#'>"+ sess.name+"</a></li><li> <a href='/logout'>logout</a>";
	else
		name=" <a href='/login'>login</a>";
	html = tmpl.render({name : name});	
	response.send(html);
	response.end();
	
}

function uploadPost(request,response,photo){

	var document = {} ;

	var name =request.session.name;
	User.findOne({name :name},function(err,user){
		console.log(user);
		document = {
			name : name,
			photo : photo,
			password : user.password
		};

		User.findAndModify({ name: name}, [], document, {}, function (err, user) {
	  		if (err) throw err;
	  		//exec('rm ' + __dirname+'/pubilic/'+user.value.photo , function (err, stdout, stderr) {});
	  		if(user.value.photo!="photos/default"){
	  			const fs = require('fs');
				fs.unlink(__dirname+'/public/'+user.value.photo , (err) => {
				  if (err) throw err;
				  console.log('successfully deleted /tmp/hello');
				});
			}
	  		console.log('updated, counter is ' + user.value.photo);
		});
	});
	

	tmpl = jsrender.templates('./views/model.html');
	var content="<img src='"+photo+"'></img>";
	var html = tmpl.render({content: content});
	response.send(html);
	response.end();

}

function upload(request, response) {
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
	var name = request.session.name;
	User.findOne({name :name},function(err,user){
		var photo = user.photo;
		tmpl = jsrender.templates('./views/model.html');
		var content="<img src='"+photo+"'></img>";
		console.log(content);
		var html = tmpl.render({content: content});
		response.send(html);
		response.end();
	});
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
			var name ="<a href='#'>"+ sess.name+"</a></li><li> <a href='/logout'>logout</a>";
			tmpl = jsrender.templates('./views/index.html');
			html = tmpl.render({name : name});
		}
		response.send(html);
		response.end();
	});
}

function login(request, response) {
	tmpl = jsrender.templates('./views/login.html');
	var html = tmpl.render();
	response.send(html);
	response.end();
}


function logout(request, response) {
	sess=request.session;
	sess.destroy();
	response.redirect('/');
}

exports.start = start;
exports.upload = upload;
exports.find = find;
exports.show= show;
exports.login=login;
exports.logout=logout;
exports.uploadPost=uploadPost;
exports.loginPost=loginPost;