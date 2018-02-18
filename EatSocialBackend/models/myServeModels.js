var restaurants = require('./restaurants')();
var menus = require('./menus')();
var menuItems = require('./menuItems')();
var visits = require('./visits')();
var servings = require('./servings')();
var tables = require('./tables')();

dataBaseApi = {
	restaurantsModel : restaurants,
	menusModel : menus,
	menuItemsModels : menuItems,
	visitsModels : visits,
	servingsModels : servings,
	tablesModel : tables
}

module.exports = dataBaseApi;