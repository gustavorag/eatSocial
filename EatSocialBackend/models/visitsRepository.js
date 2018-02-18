var myServerModels = require('./myServeModels');
var servingsRepository = require('./../models/servingsRepository');

var utils = require('util');

var getVisitsServings = function(visits, index, callbackFunction){

	if(visits != undefined){
		if(!Array.isArray(visits)){
			callbackFunction('Object to iterate is not an Array')
		}
	}

	if(index < visits.length){
		servingsRepository.getByVisitId(visits[index]._id, true, function(errServings, servings){
			if(errServings){
				callbackFunction(errServings);
			}else{
				visits[index].servings = servings
				getVisitsServings(visits, ++index, callbackFunction);
			}
		})	
	}else{
		callbackFunction();
	}
}

api = {
	getAll:function(getServings, callbackFunction){
		console.log("restaurantsRepository Getting all..")
		myServerModels.visitsModel.find().lean().exec(function(err, visits){
			if(err){
				callbackFunction(err, undefined)
			}else{
				if(getServings == true){
					getVisitsServings(visits, 0, function(error){
						if(error){
							callbackFunction(error, undefined)
						}else{
							callbackFunction(undefined, visits);
						}
					})
				}else{
					callbackFunction(undefined, visits);
				}
			}
		});
	},
	getById:function(id, getServings, callbackFunction){

		myServerModels.visitsModel.find({"_id":id}).lean().exec(function(err, visits){

			var visit = undefined;
			if(Array.isArray(visits)){
				if(visits.length > 1){
					err = "More than one visit found with same id ["+id+"]"
				}
				if(visits.length == 1){
					visit = visits[0];
				}
			}else{
				visit = visits;
			}
			if(err){
				callbackFunction(err, undefined)
			}else{
				
				if(getServings == true){
					getVisitsServings([visit], 0, function(error){
						if(error){
							callbackFunction(error, undefined)
						}else{
							callbackFunction(undefined, visit);
						}
					})
				}else{
					callbackFunction(undefined, visit);
				}
			}
		});
	},
	getByRestaurantId:function(id, getServings, callbackFunction){
		myServerModels.visitsModel.find({"restaurantId":id}).lean().exec(function(err, visits){
			if(err){
				callbackFunction(err, undefined)
			}else{
				if(getServings == true){
					getVisitsServings(visits, 0, function(error){
						if(error){
							callbackFunction(error, undefined)
						}else{
							callbackFunction(undefined, visits);
						}
					})
				}else{
					callbackFunction(undefined, visits);
				}
			}
		});
	},
	getByUserId:function(userId, getServings, callbackFunction){
		myServerModels.visitsModel.find({"users": id}).lean().exec(function(err, visits){
			if(err){
				callbackFunction(err, undefined)
			}else{
				if(getServings == true){
					getVisitsServings(visits, 0, function(error){
						if(error){
							callbackFunction(error, undefined)
						}else{
							callbackFunction(undefined, visits);
						}
					})
				}else{
					callbackFunction(undefined, visits);
				}
			}
		});
	},
	deleteById: function(id, getServings, callbackFunction){
		myServerModels.visitsModel.findByIdAndRemove(id).lean().exec(function(err, visit){
			if(err){
				callbackFunction(err, undefined)
			}else{
				callbackFunction(undefined, visit)
			}
		});
	},
	postVisit:function(visit, callbackFunction){
		myServerModels.visitsModel.create(visit).lean().exec(function(err, savedVisit){
			if(err){
				callbackFunction(err, undefined);
			}else{
				callbackFunction(undefined, savedVisit)
			}
		})
	}
}

module.exports = api;
