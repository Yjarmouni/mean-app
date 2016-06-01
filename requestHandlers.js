var exec = require("child_process").exec;
var fs = require('fs');
var jsrender = require('jsrender');
var User = require("./models.js").User;

var tmpl;

function start(request,response) {
	tmpl = jsrender.templates('./views/index.html');

	var content = jsrender.templates('./views/start.html');
	var contenthtml= content.render();
	var html = myrender(request,tmpl,contenthtml);
	response.send(html);
	response.end();
	
	
}

function uploadPost(request,response,photo){

	var document = {} ;

	var name =request.session.name;
	User.findOne({name :name},function(err,user){
		
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
				fs.unlink(__dirname+'/public/'+user.value.photo , function(err){
				  if (err) throw err;
				  
				});
			}
	  		
		});
	});
	

	response.redirect('/show');

}

function upload(request, response) {
	tmpl = jsrender.templates('./views/index.html');
	var content = jsrender.templates('./views/up.html');
	var contenthtml= content.render();
	var html = myrender(request,tmpl,contenthtml);
	response.send(html);
	response.end();
	
}

function find(request, response) {
	exec("ls /",
		{setTimeout : 10000 , maxBuffer : 20000*1024 },
		function(error,stdout,stderr){
			tmpl = jsrender.templates('./views/index.html');
			stdout=stdout.replace(/\n/g, "<br />");

			stdout="<div id='find'><span style='color : #00BD3C;'><strong>p2p@WMD-2I-INPT</strong></span>:~$ ls /<br />"+stdout+"</div>";
			var html = myrender(request,tmpl,stdout);
			response.send(html);
			response.end();
			/*response.writeHead(200,{"Content-Type":"text/plain"});
			response.write(stdout);
			response.end();*/
		});
}

function show(request, response) {
	var name = request.session.name;
	User.findOne({name :name},function(err,user){
		var photo = user.photo;
		tmpl = jsrender.templates('./views/index.html');
		var content="<img class='img-thumbnail photo' src='"+photo+"'></img>";
		var html = myrender(request,tmpl,content);
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
			var template = jsrender.templates('./views/index.html');
			var content = template.render({content : html});
			response.send(content);
		}	
		else{
			sess=request.session;
			sess.name=user.name;
			response.redirect('/start');
		}
		
	});
}

function login(request, response) {

	var htmlcontent = jsrender.templates('./views/login.html');
	var content = htmlcontent.render({content : ''});
	tmpl=jsrender.templates('./views/index.html');
	var html=myrender(request,tmpl,content);
	response.send(html);
	response.end();
}


function logout(request, response) {
	sess=request.session;
	sess.destroy();
	response.redirect('/');
}

//utile functions

function myrender(request,template,data){
	var name='';
	var sess=request.session;
	if(sess.name)
		name="<a href='#'>"+ sess.name+"</a></li><li> <a href='/logout'>logout</a>";
	else
		name=" <a href='/login'>login</a>";
	
	return template.render({name : name,content : data});

}



exports.start = start;
exports.upload = upload;
exports.find = find;
exports.show= show;
exports.login=login;
exports.logout=logout;
exports.uploadPost=uploadPost;
exports.loginPost=loginPost;