const { prompt, Separator } = require('inquirer');
const { resolve } = require('path');
const fs = require('fs-extra');
const getRoutesFile = require('./routes-template').getRoutesFile;
const getAppFile = require('./app-template').getAppFile;
const getViewFile = require('./view-template').getViewFile;
const getComponentFile = require('./component-template').getComponentFile;
const appendAppFile = require('./app-template').appendAppFile;
const getModules = require('./get-modules').getModules;

const question = [
	{
		type: 'input',
		name: 'routePath',
		message: 'Route path:',
		validate(answer) {
			if (!answer || !answer.trim()) {
				return '请输入路由路径';
			}
			return true;
		},
	},
	{
		type: 'list',
		name: 'pageType',
		message: 'Select page type:',
		choices: ['basic', 'paging', 'tabs-paging'],
		default: 'basic'
	}
];
prompt(question).then(answers => {
	const paths = answers.routePath.split('/').map(i => i.trim()).filter(i => i !== '');
	const modules = getModules();
	const curModule = paths[0];

	if (!curModule){
		return console.error('path is wrong');
	} else if (!modules.includes(curModule)) { // 新模块需要的额外输出
		modules.push(curModule);
		fs.outputFileSync('./src/pages/router/routes.js', getRoutesFile(modules));
		fs.outputFileSync(`./src/pages/containers/${curModule}/app.js`, getAppFile(paths));
	} else { // 不是新模块需要更新app.js
		const appPath = `./src/pages/containers/${curModule}/app.js`;
		fs.outputFileSync(appPath, appendAppFile(paths, appPath));

	}
	// 无论是不是新模块都输出的文件
	const fileName = paths.filter((i, index) => index > 0).join('-');
	// view
	fs.outputFileSync(`./src/pages/containers/${curModule}/views/${fileName}.vue`, getViewFile(paths));
	// components

	if (answers.pageType === 'basic'){
		fs.outputFileSync(`./src/pages/components/${curModule}/${fileName}/content.vue`, getComponentFile(paths, 'basic'));
	} else if (answers.pageType === 'paging'){
		fs.outputFileSync(`./src/pages/components/${curModule}/${fileName}/filter.vue`, getComponentFile(paths, 'filter'));
		fs.outputFileSync(`./src/pages/components/${curModule}/${fileName}/list.vue`, getComponentFile(paths, 'list'));
		fs.outputFileSync(`./src/pages/components/${curModule}/${fileName}/content.vue`, getComponentFile(paths, 'list-content'));
	} else if (answers.pageType === 'tabs-paging'){
		fs.outputFileSync(`./src/pages/components/${curModule}/${fileName}/filter.vue`, getComponentFile(paths, 'filter'));
		fs.outputFileSync(`./src/pages/components/${curModule}/${fileName}/tab-list.vue`, getComponentFile(paths, 'tab-list'));
		fs.outputFileSync(`./src/pages/components/${curModule}/${fileName}/content.vue`, getComponentFile(paths, 'tab-list-content'));
	}

});