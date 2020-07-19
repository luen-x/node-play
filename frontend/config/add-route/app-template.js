const recast = require('recast');
const getAppFile = paths => {
	return `export default [
	{
		path: '/${paths.join('/')}',
		name: '${paths.join('-')}',
		component: () => import('./views/${paths.filter((i, index) => index > 0).join('-')}.vue')
	}
];`;
};
const fs = require('fs-extra');

const appendAppFile = (paths, appFilePath) => {
	const file = fs.readFileSync(appFilePath).toString();

	const index =  file.lastIndexOf('}');
	return file.substring(0, index + 1) + `,
	{
		path: '/${paths.join('/')}',
		name: '${paths.join('-')}',
		component: () => import('./views/${paths.filter((i, index) => index > 0).join('-')}.vue')
	}` + file.substring(index + 1);

};
const reduceAppFile = (paths, appFilePath) => {
	let file = fs.readFileSync(appFilePath).toString();
	file = file.replace(/\(\) => import/g, 'xImport');
	const ast = recast.parse(file);
	const routesEles = ast.program.body[0].declaration.elements;
	const pathVal = '/' + paths.join('/');
	ast.program.body[0].declaration.elements = routesEles.filter(i => i.properties[0].value.value !== pathVal);
	file = recast.print(ast).code;
	file = file.replace(/xImport/g, '() => import');
	// const str = `,
	// {
	// 	path: '/${paths.join('/')}',
	// 	name: '${paths.join('-')}',
	// 	component: () => import('./views/${paths.filter((i, index) => index > 0).join('-')}.vue')
	// }`;
	// const str2 = `
	// {
	// 	path: '/${paths.join('/')}',
	// 	name: '${paths.join('-')}',
	// 	component: () => import('./views/${paths.filter((i, index) => index > 0).join('-')}.vue')
	// },`;
	// file = file.replace(str, '').replace(str2, '');
	return file;

};

module.exports.getAppFile = getAppFile;
module.exports.appendAppFile = appendAppFile;
module.exports.reduceAppFile = reduceAppFile;
