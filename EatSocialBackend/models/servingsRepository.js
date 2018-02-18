var myServerModels = require('./myServeModels');

var getMenusItems = function(itemsSelection, index, callbackFunction){

	if(itemsSelection != undefined){
		if(!Array.isArray(itemsSelection)){
			callbackFunction('Object to iterate is not an Array')
		}
	}

	if(index < itemsSelection.length){
		menuItemsRepository.getById(itemsSelection[index].itemId, function(errMenuItems, menuItem){
			if(errMenuItems){
				callbackFunction(errMenuItems);
			}else{
				itemsSelection[index].itemDetails = menuItem
				getMenusItems(itemsSelection, ++index, callbackFunction);
			}
		})	
	}else{
		callbackFunction();
	}
	
}

api = {
	getAll:function(getItems, callbackFunction){
		console.log("restaurantsRepository Getting all..")
		myServerModels.servingsModel.find().lean().exec(function(err, servings){
			if(err){
				callbackFunction(err, undefined)
			}else{
				if(getItems == true){
					getMenusItems(servings, 0, function(error){
						if(error){
							callbackFunction(error, undefined)
						}else{
							callbackFunction(undefined, servings);
						}
					})
				}else{
					callbackFunction(undefined, servings);
				}
			}
		});
	},
	getById:function(id, getItems, callbackFunction){
		myServerModels.servingsModel.find({"_id":id}).lean().exec(function(err, servings){

			var serving = undefined;
			if(Array.isArray(servings)){
				if(servings.length > 1){
					err = "More than one serving found with same id ["+id+"]"
				}
				if(servings.length == 1){
					serving = servings[0];
				}
			}else{
				serving = servings;
			}
			if(err){
				callbackFunction(err, undefined)
			}else{
				if(getItems == true){
					getMenusItems(serving, 0, function(error){
						if(error){
							callbackFunction(error, undefined)
						}else{
							callbackFunction(undefined, serving);
						}
					})
				}else{
					callbackFunction(undefined, serving);
				}
			}
		});
	},
	getByVisitId:function(visitId, getItems, callbackFunction){
		myServerModels.servingsModel.find({"visitId":id}).lean().exec(function(err, servings){
			if(err){
				callbackFunction(err, undefined)
			}else{
				if(getItems == true){
					getMenusItems(servings, 0, function(error){
						if(error){
							callbackFunction(error, undefined)
						}else{
							callbackFunction(undefined, servings);
						}
					})
				}else{
					callbackFunction(undefined, servings);
				}
			}
		});
	},
	deleteById: function(id, callbackFunction){
		myServerModels.servingsModel.findByIdAndRemove(id).lean().exec(function(err, serving){
			if(err){
				callbackFunction(err, undefined)
			}else{
				callbackFunction(undefined, serving)
			}
		});
	},
	postServing:function(serving, callbackFunction){
		
		myServerModels.servingsModel.create(serving).lean().exec(function(err, savedServing){
			if(err){
				callbackFunction(err, undefined);
			}else{
				callbackFunction(undefined, savedServing)
			}
		})
	}
}
module.exports = api;
