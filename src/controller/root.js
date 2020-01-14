const fs = require('fs');
const dirs = fs.readdirSync(__dirname);
const dirsFiltered = dirs.filter(fileName=>fileName!=='root.js' && fileName!=='BaseController.js');
const controllers =[];

dirsFiltered.forEach(fileName => {
	const controller = require('./'+fileName); 
	if(Array.isArray(controller)){
		controllers.push(...controller)
	}else {
		controllers.push(controller)
	}
})

module.exports = controllers
