var myServerModels = require('./myServeModels');
var menuItemsRepository = require('./../models/menuItemsRepository');

var getMenusItems = function(menus, index, callbackFunction){

	if(menus != undefined){
		if(!Array.isArray(menus)){
			callbackFunction('Object to iterate is not an Array')
		}
	}

	if(index < menus.length){
		menuItemsRepository.getByMenuId(menus[index].menuId, function(errMenuItems, menuItems){
			if(errMenuItems){
				callbackFunction(errMenuItems);
			}else{
				menus[index].items = menuItems
				getMenusItems(menus, ++index, callbackFunction);
			}
		})	
	}else{
		callbackFunction();
	}
	
}

api = {
	getAll:function(getItems, callbackFunction){
		myServerModels.menusModel.find().lean().exec(function(err, menus){
			if(err){
				callbackFunction(err, undefined)
			}else{
				var menusArr = [];
				if(Array.isArray(menus)){
					menusArr = menus;
				}else{
					menusArr.push(menus);
				}
				if(getItems == true){
					getMenusItems(menusArr, 0, function(error){
						if(error){
							callbackFunction(error, undefined)
						}else{
							callbackFunction(undefined, menusArr);
						}
					})
				}else{
					callbackFunction(undefined, menusArr);
				}
			}
		});
	},
	getById:function(id, getItems, callbackFunction){
		myServerModels.menusModel.find({"menuId":id}).lean().exec(function(err, menus){
			var menu = undefined;
			if(Array.isArray(menus)){
				if(menus.length > 1){
					err = "More than one menu found with same id ["+id+"]"
				}
				if(menus.length == 1){
					menu = menus[0];
				}
			}else{
				menu = menus;
			}
			if(err){
				callbackFunction(err, undefined)
			}else{
				if(getItems == true){
					getMenusItems([menu], 0, function(error){
						if(error){
							callbackFunction(error, undefined)
						}else{
							callbackFunction(undefined, menu);
						}
					})
				}else{
					callbackFunction(undefined, menu);
				}
			}
		});
	},
	getByRestaurantId:function(id, getItems, callbackFunction){
		myServerModels.menusModel.find({"restaurantId":id}).lean().exec(function(err, menus){
			if(err){
				callbackFunction(err, undefined)
			}else{
				var menusArr = [];
				if(Array.isArray(menus)){
					menusArr = menus;
				}else{
					menusArr.push(menus);
				}
				console.log("getItems "+getItems)
				if(getItems == true){
					console.log("Getting all items")
					getMenusItems(menusArr, 0, function(error){
						if(error){
							callbackFunction(error, undefined)
						}else{
							callbackFunction(undefined, menusArr);
						}
					})
				}else{
					callbackFunction(undefined, menusArr);
				}
			}
		});
	},
	getByRestaurantIdAndType:function(id, type, getItems, callbackFunction){
		myServerModels.menusModel.find({"restaurantId":id, "type":type}).lean().exec(function(err, menus){
			if(err){
				callbackFunction(err, undefined)
			}else{
				var menusArr = [];
				if(Array.isArray(menus)){
					menusArr = menus;
				}else{
					menusArr.push(menus);
				}
				if(getItems == true){
					getMenusItems(menusArr, 0, function(error){
						if(error){
							callbackFunction(error, undefined)
						}else{
							callbackFunction(undefined, menusArr);
						}
					})
				}else{
					callbackFunction(undefined, menusArr);
				}
			}
		});
	}
}
module.exports = api;
