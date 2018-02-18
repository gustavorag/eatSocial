var express = require('express');
var router = express.Router();
var menuItemsRepository = require('./../models/menuItemsRepository');

/* GET menu items listing. */
router.get('/', function(req, res) {
	
	menuItemsRepository.getAll(function(err, menuItems){
		if(err){
			res.end("Error while trying to get menuItems: "+err)
		}
		if(!menuItems || menuItems.length < 1){
			res.end("Nothing found for menu item")
		}else{
			res.end(JSON.stringify(menuItems));
		}
	});
});
/* GET menuItem by id */
router.get('/:menuItemId', function(req, res) {
	
	var menuItemId = req.params.menuItemId

	menuItemsRepository.getById(menuItemId, function(err, menuItem){
		if(err){
			res.end("Error while trying to get menu item ["+menuItemId+"]. Error: "+err)
		}
		if(!menuItem){
			res.end("Nothing found")
		}else{
			res.end(JSON.stringify(menuItem));
		}
	});
});
/* GET restaurant menuItems by id */
router.get('/menu/:menuId', function(req, res) {
	
	var menuId = req.params.menuId

	menuItemsRepository.getByMenuId(menuId, function(err, menuItems){
		if(err){
			res.end("Error while trying to get menuItems for menu ["+menuId+"]. Error: "+err)
		}
		if(!menuItems){
			res.end("Nothing found")
		}else{
			res.end(JSON.stringify(menuItems));
		}
	});
});


module.exports = router;