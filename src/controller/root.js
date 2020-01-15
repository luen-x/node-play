const fs = require('fs');
const Controller = require('./BaseController')
const dirs = fs.readdirSync(__dirname);
const dirsFiltered = dirs.filter(fileName=>fileName!=='root.js' && fileName!=='BaseController.js');
const controllers =[];

dirsFiltered.forEach(fileName => {
	const controller = require('./'+fileName); 
	if(Array.isArray(controller)){
		controllers.push(...controller.map(c=>new Controller(c)))
	}else {
		controllers.push(new Controller(controller))
	}
})

module.exports = controllers
