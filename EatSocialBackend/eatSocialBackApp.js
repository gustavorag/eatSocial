var express = require('express');
var path = require('path');
var fs = require("fs");
var bodyParser = require('body-parser');
var exec = require('child_process').exec;

// ROUTERS
var restaurants = require('./routes/restaurantsRouter');
var visits = require('./routes/visitsRouter');
var menuItems = require('./routes/menuItemsRouter');
var menus = require('./routes/menusRouter');

var app = express();
// var port = 8087;

var appConfig;

var logger;

var loadAppConfig = function(){
	
	fs.readFile( __dirname + "/" + "backend.config", 'utf8', function (err, data) {

		appConfig = JSON.parse(data);

   		//Creating log
   		logger = (function() {

   			var logNumberLevel;
   			if(appConfig.logLevel == "DEBUG"){
   				logNumberLevel = 0;
   			}
   			else if(appConfig.logLevel == "INFO"){
   				logNumberLevel = 1;
   			}
   			else if(appConfig.logLevel == "WARNING"){
   				logNumberLevel = 2;
   			}
   			else{
   				logNumberLevel = 3;
   			}

   			api={
   				debug:function(text){
   					if(logNumberLevel == 0){
   						console.log("DEBUG: "+text);
   					}
   				},
   				info:function(text){
   					if(logNumberLevel <= 1){
   						console.log("INFO: "+text);
   					}
   				},
   				warning:function(text){
   					if(logNumberLevel <= 2){
   						console.log("WARNING: "+text);
   					}
   				},
   				error: function(text){
   					if(logNumberLevel <= 3){
   						console.log("ERROR: "+text);
   					}
   				}
   			}
   			return api;
   		})();

   		startApp();
   	});
	
}


var startApp = function(){
	logger.debug("Start app")
	//Starting configurations
	if(appConfig.devMode){
		logger.warning("** ATENTION - STARTING APP IN DEV MODE **")
		//sebalApi = require('./routes/sebalMockApi.js');
	}else{
		// sebal = require('./routes/sebalApi.js');
		// sebalApi = sebal.SebalApi(appConfig.saps);
	}

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended:false}));

	// Add headers
	app.use(function (req, res, next) {

	    // Website you wish to allow to connect
	    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8087');

	    // Request methods you wish to allow
	    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	    // Request headers you wish to allow
	    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	    // Set to true if you need the website to include cookies in the requests sent
	    // to the API (e.g. in case you use sessions)
	    res.setHeader('Access-Control-Allow-Credentials', true);

	    // Pass to next layer of middleware
	    next();
	});
	// app.use(express.static(path.join(__dirname, '/public'))); //Point to Angular frontend content

	// Defining ROUTES
   app.use(express.static(path.join(__dirname, 'imgserver')));
	app.use('/restaurants', restaurants);
   app.use('/visits', visits);
   app.use('/menuItems', menuItems);
   app.use('/menus', menus);

	app.listen(appConfig.port, function(err, res){
		if(err){
			logger.error("Error while starting server");
		}else{
			logger.info("Running at "+appConfig.port);		
		}
	});
	
}

loadAppConfig();