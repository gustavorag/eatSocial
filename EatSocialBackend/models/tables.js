module.exports = function(){
	var db = require('./../libs/connect_db')();
	var Schema = require('mongoose').Schema;

	var table = Schema({
		tableId: String,
		tableFriendlyCode: String,
		tableQRcode: String,
		tableQRcodeUrl: String,
		restaurantId: String
	});

	return db.model("tables", table);
}