var express = require('express');
var router = express.Router();
var visitsRepository = require('./../models/visitsRepository');
var servingsRepository = require('./../models/servingsRepository');


var retServings;

var extractQueryParams = function(req, res) {
	retServings = req.query.retServings;
}

/* GET visits listing. */
router.get('/', extractQueryParams, function(req, res) {
	
	visitsRepository.getAll(retServings, function(err, visits){
		if(err){
			res.end("Error while trying to get visits: "+err)
		}
		if(!visits || visits.length < 1){
			res.end("Nothing found")
		}else{
			res.end(JSON.stringify(visits));
		}
	});
});
/* GET visit by id */
router.get('/:visitId', extractQueryParams, function(req, res) {
	
	var visitId = req.params.visitId

	visitsRepository.getById(visitId, retServings, function(err, visit){
		if(err){
			res.end("Error while trying to get visit ["+visitId+"]. Error: "+err)
		}
		if(!visit){
			res.end("Nothing found")
		}else{
			res.end(JSON.stringify(visit));
		}
	});
});
/* GET restaurant visits by id */
router.get('/restaurant/:restaurantId', extractQueryParams, function(req, res) {
	
	var restaurantId = req.params.restaurantId

	visitsRepository.getByRestaurantId(restaurantId, retServings, function(err, visits){
		if(err){
			res.end("Error while trying to get visits from restaurant ["+restaurantId+"]. Error: "+err)
		}
		if(!visits || visits.length < 1){
			res.end("Nothing found")
		}else{

			res.end(JSON.stringify(visit));
		}
	});
});

/* GET restaurant menus by id and type */
router.get('/user/:userId', extractQueryParams, function(req, res) {
	
	var userId = req.params.userId
	var type = req.params.type

	visitsRepository.getByUserId(userId, retServings, function(err, visits){
		if(err){
			res.end("Error while trying to get visits from user ["+userId+"]. Error: "+err)
		}
		if(!visits || visits.length < 1){
			res.end("Nothing found")
		}else{
			res.end(JSON.stringify(visit));
		}
	});
});

module.exports = router;