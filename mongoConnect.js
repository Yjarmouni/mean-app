var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
	console.log("we're in");
});

var model = function(name,document){
	var mySchema =  mongoose.Schema(document);
	mySchema.statics.findAndModify = function (query, sort, doc, options, callback) {
  			return this.collection.findAndModify(query, sort, doc, options, callback);
	};
	return mongoose.model(name,mySchema);
}

exports.mongoose = mongoose;
exports.model = model;