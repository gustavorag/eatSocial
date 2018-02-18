var myServerModels = require('./myServeModels');
var tablesRepository = require('./../models/tablesRepository');

var getRestaurantsTables = function(restaurants, index, callbackFunction){

	if(restaurants != undefined){
		if(!Array.isArray(restaurants)){
			callbackFunction('Object to iterate is not an Array')
		}
	}

	if(index < restaurants.length){
		tablesRepository.getByRestaurantId(restaurants[index].restaurantId, function(err, tables){
			if(err){
				callbackFunction(err);
			}else{
				restaurants[index].tables = tables
				getRestaurantsTables(restaurants, ++index, callbackFunction);
			}
		})	
	}else{
		callbackFunction();
	}
}

api = {
	getAll:function(callbackFunction){
		console.log("restaurantsRepository Getting all..")
		myServerModels.restaurantsModel.find().lean().exec( function(err, restaurants){
			if(err){
				callbackFunction(err, undefined)
			}else{
				var restaurantsArr = [];
				if(Array.isArray(restaurants)){
					restaurantsArr = restaurants;
				}else{
					restaurantsArr.push(restaurants);
				}
				getRestaurantsTables(restaurantsArr, 0, function(error){
					if(error){
						callbackFunction(error, undefined)
					}else{
						callbackFunction(undefined, restaurantsArr);
					}
				})
			}
		});
	},
	getById:function(id, callbackFunction){
		myServerModels.restaurantsModel.find({"restaurantId":id}).lean().exec( function(err, restaurants){
			var restaurant = undefined;
			if(Array.isArray(restaurants)){
				if(restaurants.length > 1){
					err = "More than one restaurant found with same id ["+id+"]"
				}
				if(restaurants.length == 1){
					restaurant = restaurants[0];
				}
			}else{
				restaurant = restaurants;
			}
			if(err){
				callbackFunction(err, undefined)
			}else{
				getRestaurantsTables([restaurant], 0, function(error){
					if(error){
						callbackFunction(error, undefined)
					}else{
						callbackFunction(undefined, restaurant);
					}
				})
			}
		});
	}
}
module.exports = api;
