var myServerModels = require('./myServeModels');

api = {
	getAll:function(callbackFunction){
		myServerModels.tablesModel.find().lean().exec( function(err, tables){
			if(err){
				callbackFunction(err, undefined)
			}else{
				var tableArr = [];
				if(Array.isArray(tables)){
					tableArr = tables;
				}else{
					tableArr.push(tables);
				}
				callbackFunction(undefined, tableArr);
			}
		});
	},
	getById:function(id, callbackFunction){
		myServerModels.tablesModel.find({"tableId":id}).lean().exec( function(err, tables){
			var table = undefined;
			if(Array.isArray(tables)){
				if(tables.length > 1){
					err = "More than one table found with same id ["+id+"]"
				}
				if(tables.length == 1){
					table = tables[0];
				}
			}else{
				table = tables;
			}
			if(err){
				callbackFunction(err, undefined)
			}else{
				callbackFunction(undefined, table)
			}
		});
	},
	getByRestaurantId:function(restaurantId, callbackFunction){
		myServerModels.tablesModel.find({"restaurantId":restaurantId}).lean().exec(function(err, tables){
			if(err){
				callbackFunction(err, undefined)
			}else{
				var tableArr = [];
				if(Array.isArray(tables)){
					tableArr = tables;
				}else{
					tableArr.push(tables);
				}
				callbackFunction(undefined, tableArr);
			}
		});
	}
}
module.exports = api;
