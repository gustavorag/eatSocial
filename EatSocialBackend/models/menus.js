module.exports = function(){
	var db = require('./../libs/connect_db')();
	var Schema = require('mongoose').Schema;

	var menu = Schema({
		menuId: String,
		restaurantId: String,
		menuName: String,
		type: String,
		photoUrl: String
	});

	return db.model("menus", menu);
}