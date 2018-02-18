var myServerModels = require('./myServeModels');

api = {
	// Should return allways an array
	getAll:function(callbackFunction){
		myServerModels.menuItemsModels.find().lean().exec(function(err, menuItems){
			if(err){
				callbackFunction(err, undefined)
			}else{
				var menuItemsArr = [];
				if(Array.isArray(menuItems)){
					menuItemsArr = menuItems;
				}else{
					menuItemsArr.push(menuItems);
				}
				callbackFunction(undefined, menuItemsArr);
			}
		});
	},
	// Should return only one
	getById:function(id, callbackFunction){
		myServerModels.menuItemsModels.find({"menuItemId":id}).lean().exec(function(err, menuItems){

			var menuItem = undefined;
			if(Array.isArray(menuItems)){
				if(menuItems.length > 1){
					err = "More than one menuItem found with same id ["+id+"]"
				}
				if(menuItems.length == 1){
					menuItem = menuItems[0];
				}
			}else{
				menuItem = menuItems;
			}
			if(err){
				callbackFunction(err, undefined)
			}else{
				callbackFunction(undefined, menuItem)
			}

		});
	},
	// Should return allways an array
	getByMenuId:function(menuId, callbackFunction){
		console.log("Getting items from menu "+menuId)
		myServerModels.menuItemsModels.find({"menuId":menuId}).lean().exec(function(err, menuItems){
			if(err){
				callbackFunction(err, undefined)
			}else{

				var menuItemsArr = [];
				if(Array.isArray(menuItems)){
					menuItemsArr = menuItems;
				}else{
					menuItemsArr.push(menuItems);
				}
				callbackFunction(undefined, menuItemsArr);
			}
		});
	}
}
module.exports = api;
