var User = require("./user.js").User;

User.find(function(err,user){
	console.log(user);
});
	
