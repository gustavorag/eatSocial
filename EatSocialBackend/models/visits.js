module.exports = function(){
	var db = require('./../libs/connect_db')();
	var Schema = require('mongoose').Schema;

	var visit = Schema({
		visitId: String,
		users: [String],
		restaurantId: String,
		checkInTime: Date,
		checkOutTime: Date,
		tableId: String
	});

	return db.model("visits", visit);
}