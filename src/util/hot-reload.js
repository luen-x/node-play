const fs = require('fs');
const path = require('path');
const file = path.resolve('../../src')
const eventCenter = require('../emitter/center');


const handleChange = (err,fileName)=>{
	
	console.log(fileName+" change")
	// console.log(Object.keys(require.cache))
	if (module.parent) {
        module.parent.children.splice(module.parent.children.indexOf(module), 1);
    }
	require.cache[fileName]=null;
	eventCenter.emit()
	

}
const watcher = fs.watch(file,{recursive:true},handleChange)