var mon = require("./mongoConnect");

document ={
		name: String,
		password : String}

var User = mon.model('User',document);
/*
var find = function(document){
	return User.find(document,function (err, users) {
		if (err) return console.error(err);
		  	console.log(users);
		});
}*/

exports.User = User;
//exports.find = find;
/*
var user = new User({
	name:'anass',
	password:'123456'
});
User.find(function (err, users) {
	if (err) return console.error(err);
	  	console.log(users);
	});
console.log(user.name);
*/