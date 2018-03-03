var express = require('express');
var router = express.Router();
var tablesRepository = require('./../models/tablesRepository');


var retServings;

var extractQueryParams = function(req, res, next) {
	retServings = req.query.retServings;
	next();
}

/* GET tables listing. */
router.get('/', extractQueryParams, function(req, res) {
	
	console.log("Getting all table ")

	res.end(JSON.stringify("{tables:2}"));

	// tablesRepository.getAll(function(err, tables){
	// 	if(err){
	// 		res.end("Error while trying to get tables: "+err)
	// 	}
	// 	if(!tables || tables.length < 1){
	// 		res.end("Nothing found")
	// 	}else{
	// 		res.end(JSON.stringify(tables));
	// 	}
	// });
});
/* GET table by qrcode */
router.get('/qrcode/:qrcode', extractQueryParams, function(req, res) {
	
	var qrcode = req.params.qrcode

	tablesRepository.getByQRCode(qrcode, function(err, table){
		if(err){
			res.end("Error while trying to get table ["+qrcode+"]. Error: "+err)
		}
		if(!table){
			res.end("Nothing found")
		}else{
			res.end(JSON.stringify(table));
		}
	});
});


module.exports = router;