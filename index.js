var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");


var handle = {};
handle['/']= requestHandlers.start;
handle["/start"]=requestHandlers.start;
handle["/find"]=requestHandlers.find;
handle["/show"]=requestHandlers.show;
handle["/logout"]=requestHandlers.logout;

handle["/register"]=requestHandlers.register;        
handle["registerPost"]=requestHandlers.registerPost;

handle["/upload"]= requestHandlers.upload;
handle["uploadPost"]=requestHandlers.uploadPost;

handle["/login"]=requestHandlers.login;
handle["loginPost"]=requestHandlers.loginPost;

server.start(router.route,handle);