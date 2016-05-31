var mon = require("./mongoConnect");

document ={
		name: String,
		password : String,
		photo : String
	}

var User = mon.model('User',document);


exports.User = User;
