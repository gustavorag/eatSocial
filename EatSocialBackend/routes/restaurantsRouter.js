var express = require('express');
var router = express.Router();
var restaurantsRepository = require('./../models/restaurantsRepository');

/* GET restaurants listing. */
router.get('/', function(req, res) {
	
	restaurantsRepository.getAll(function(err, restaurants){
		if(err){
			res.end("Error while trying to get restaurants: "+err)
		}
		if(!restaurants || restaurants.length < 1){
			res.end("Nothing found")
		}else{
			res.end(JSON.stringify(restaurants));
		}
	});
});
/* GET restaurant by id */
router.get('/:restaurantId', function(req, res) {
	
	var restId = req.params.restaurantId

	restaurantsRepository.getById(restId, function(err, restaurant){
		if(err){
			res.end("Error while trying to get restaurant ["+restId+"]. Error: "+err)
		}
		if(!restaurant){
			res.end("Nothing found")
		}else{
			res.end(JSON.stringify(restaurant));
		}
	});
});


module.exports = router;