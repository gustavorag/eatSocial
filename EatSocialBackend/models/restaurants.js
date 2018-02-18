module.exports = function(){
	var db = require('./../libs/connect_db')();
	var Schema = require('mongoose').Schema;

	var restaurant = Schema({
		restaurantId: String,
		name: String,
		cuisine: String,
		address: {
			country: String,
			province: String,
			city: String,
			building: String,
			coord: [],
			street: String,
			zipcode: String
		}
	});

	return db.model("restaurants", restaurant);
}