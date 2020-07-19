const { prompt, Separator } = require('inquirer');
const { resolve } = require('path');
const fs = require('fs-extra');
const reduceAppFile = require('../add-route/app-template').reduceAppFile;
const getRoutesFile = require('../add-route/routes-template').getRoutesFile;
const getModules = require('../add-route/get-modules').getModules;

const question = [
	{
		type: 'input',
		name: 'routePath',
		message: '请输入要删除的路由路径，这将会删除和该路由相关的container,components,修改app.js，routes.js\nRoute path:',
		validate(answer) {
			if (!answer || !answer.trim()) {
				return '请输入要删除的路由路径';
			}
			return true;
		},
	}
];
prompt(question).then(answers => {
	const paths = answers.routePath.split('/').map(i => i.trim()).filter(i => i !== '');
	const curModule = paths[0];
	const fileName = paths.filter((i, index) => index > 0).join('-');
	fs.removeSync(`./src/pages/containers/${curModule}/views/${fileName}.vue`);	
	fs.removeSync(`./src/pages/components/${curModule}/${fileName}`);
	const appPath = `./src/pages/containers/${curModule}/app.js`;
	fs.outputFileSync(appPath, reduceAppFile(paths, appPath));
	const views = fs.readdirSync(`./src/pages/containers/${curModule}/views`);
	if (views.length == 0){
		fs.removeSync(`./src/pages/containers/${curModule}`);
		const modules = getModules();
		fs.outputFileSync('./src/pages/router/routes.js', getRoutesFile(modules));
	}
	const comps = fs.readdirSync(`./src/pages/components/${curModule}`);
	if (comps.length == 0){
		fs.removeSync(`./src/pages/components/${curModule}`);
	}

});
