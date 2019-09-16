const fs = require('fs');
const dirs = fs.readdirSync(__dirname);
const dirsFiltered = dirs.filter(fileName=>fileName!=='root.js' && fileName!=='BaseController.js');
const controllers = dirsFiltered.map(fileName => {
	const Controller = require('./'+fileName);
	return new Controller()
})

module.exports = controllers
