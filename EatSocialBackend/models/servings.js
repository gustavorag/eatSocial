module.exports = function(){
	var db = require('./../libs/connect_db')();
	var Schema = require('mongoose').Schema;

	var serving = Schema({
		servingtId: String,
		visitId: String,
		seq: Number,
		whenType: String,
		waitTime: Number,
		itemSelections: [
		{
			itemId: String,
			quantity: Number
		}
		]
	});

	return db.model("servings", serving);
}