var mon = require("./mongoConnect");

document ={
		name: String,
		password : String}

var User = mon.model('User',document);


exports.User = User;
