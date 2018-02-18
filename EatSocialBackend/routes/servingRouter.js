var express = require('express');
var router = express.Router();
var servingsRepository = require('./../models/servingsRepository');
var menuItemsRepository = require('./../models/menuItemsRepository');


var retMenuItems = true; //By defaul always return items details

var extractQueryParams = function(req, res) {
	retMenuItems = req.query.retMenuItems;
	
	if(retMenuItems == 'false'){
		retMenuItems = false;
	}
	next();
}



/* GET menus listing. */
router.get('/', extractQueryParams, function(req, res) {
	
	servingsRepository.getAll(retMenuItems, function(err, servings){
		if(err){
			res.end("Error while trying to get servings: "+err)
		}
		if(!servings || servings.length < 1){
			res.end("Nothing found")
		}else{
			res.end(JSON.stringify(servings));
		}
	});
});
/* GET Serving by id */
router.get('/:servingId', extractQueryParams, function(req, res) {
	
	var servingId = req.params.servingId

	servingsRepository.getById(servingId, retMenuItems, function(err, serving){
		if(err){
			res.end("Error while trying to get serving ["+servingId+"]. Error: "+err)
		}
		if(!serving){
			res.end("Nothing found")
		}else{
			res.end(JSON.stringify(serving));
		}
	});
});
/* GET servings by visit id */
router.get('/visit/:visitId', extractQueryParams, function(req, res) {
	
	var visitId = req.params.visitId

	servingsRepository.getByVisitId(visitId, retMenuItems, function(err, servings){
		if(err){
			res.end("Error while trying to get servings for visit ["+visitId+"]. Error: "+err)
		}
		if(!menus){
			res.end("Nothing found")
		}else{
			res.end(JSON.stringify(servings));
		}
	});
});

module.exports = router;