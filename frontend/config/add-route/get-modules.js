const fs = require('fs-extra');

const getModules = () => {
	// const directory = resolve(__dirname, '../../src/pages/containers/');
	const targetModules = [];
	fs.readdirSync('./src/pages/containers/').forEach((file) => {
		// const fullpath = resolve(directory, file);
		// 获取文件信息
		const stat = fs.statSync('./src/pages/containers/');
		if (!['login', 'other'].includes(file) 
		&& stat.isDirectory()
		) {
			targetModules.push(file);
		}
	});
	return targetModules;
};
module.exports.getModules = getModules;