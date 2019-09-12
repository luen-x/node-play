const fs = require('fs');
const path = require('path');
const {debounce} = require('lodash')
const file = path.resolve('./src')

const delay =200;
let needUpdate  =true;
let timer;
const handleChange = (err,fileName)=>{
	if(!needUpdate) return ;
	needUpdate = false;
	if(timer){
		clearTimeout(timer);
		timer=undefined;
	}
	timer = setTimeout(() => {
		needUpdate=true;
	}, delay);
	console.log(fileName+" change")

}
const watcher = fs.watch(file,handleChange)