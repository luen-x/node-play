const fs = require('fs');
const Controller = require('./common/BaseController');
const config = require('../config/config');

const getControllerPath=(dir=__dirname, result=[])=>{
	// eslint-disable-next-line no-sync
	const dirs = fs.readdirSync(dir, {withFileTypes: true});
	dirs.forEach(d=>{
		if (d.isFile() && d.name.endsWith('Controller.js') && !config.ignoreController.includes(d.name)) {
			result.push(dir+'/'+d.name);
		} else if (d.isDirectory()) {
			getControllerPath(dir+'/'+d.name, result);
		}
	});
	return result; 
};

const paths = getControllerPath();
const controllers = [];
paths.forEach(path => {
	// eslint-disable-next-line global-require
	const con = require(path); 
	if (con.basePath) {
		con.controller.forEach(it=>{
			it.path = con.basePath+it.path;
		});
	}
	controllers.push(...con.controller.map(c=>new Controller(c)));
	
});

module.exports = controllers;
