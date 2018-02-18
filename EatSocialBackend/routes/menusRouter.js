var express = require('express');
var router = express.Router();
var menusRepository = require('./../models/menusRepository');



var retMenuItems = false;

var extractQueryParams = function(req, res, next) {

	retMenuItems = req.query.retMenuItems;
	if(retMenuItems == 'true'){
		retMenuItems = true;
	}else{
		retMenuItems = false
	}
	next();
}


/* GET menus listing. */
router.get('/', extractQueryParams, function(req, res) {
	
	menusRepository.getAll(retMenuItems, function(err, menus){
		if(err){
			res.end("Error while trying to get menus: "+err)
		}
		if(!menus || menus.length < 1){
			res.end("Nothing found")
		}else{
			res.end(JSON.stringify(menus));
		}
	});
});
/* GET menu by id */
router.get('/:menuId', extractQueryParams, function(req, res) {
	
	var menuId = req.params.menuId

	menusRepository.getById(menuId, retMenuItems, function(err, menu){
		if(err){
			res.end("Error while trying to get menu ["+menuId+"]. Error: "+err)
		}
		if(!menu){
			res.end("Nothing found")
		}else{
			res.end(JSON.stringify(menu));
		}
	});
});
/* GET restaurant menus by id */
router.get('/restaurant/:restaurantId', extractQueryParams, function(req, res) {
	
	var restaurantId = req.params.restaurantId
	console.log("Getting menus for "+restaurantId);

	menusRepository.getByRestaurantId(restaurantId, retMenuItems, function(err, menus){
		if(err){
			res.end("Error while trying to get menus for restaurant ["+restaurantId+"]. Error: "+err)
		}
		if(!menus){
			res.end("Nothing found")
		}else{
			res.end(JSON.stringify(menus));
		}
	});
});

/* GET restaurant menus by id and type */
router.get('/restaurant/:restaurantId/type/:type', extractQueryParams, function(req, res) {
	
	var restaurantId = req.params.restaurantId
	var type = req.params.type

	menusRepository.getByRestaurantIdAndType(restaurantId, type, retMenuItems, function(err, menus){
		if(err){
			res.end("Error while trying to get menus [Type: "+type+"] for restaurant ["+restaurantId+"]. Error: "+err)
		}
		if(!menus){
			res.end("Nothing found")
		}else{
			res.end(JSON.stringify(menus));
		}
	});
});

module.exports = router;