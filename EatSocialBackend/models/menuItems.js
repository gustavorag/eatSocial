module.exports = function(){
	var db = require('./../libs/connect_db')();
	var Schema = require('mongoose').Schema;

	var menuItem = Schema({
		menuItemId: String,
		menuId: String,
		type: String,
		name: String,
		info: String,
		photoUrl: String,
		price: Number,
		prepTime: Number
	});

	return db.model("menu_items", menuItem);
}