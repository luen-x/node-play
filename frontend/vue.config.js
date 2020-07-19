const path = require('path');
function resolve (dir) {
	return path.join(__dirname, dir);
}
module.exports = {
	lintOnSave: true,
	productionSourceMap: false,

	chainWebpack: (config) => {
		config.resolve.alias
			.set('@css', resolve('src/css'))
			.set('@assets', resolve('src/assets'))
			.set('@components', resolve('src/pages/components'))
			.set('@common', resolve('src/pages/components/_common'))
			.set('@constants', resolve('src/pages/constants'))
			.set('@constant', resolve('src/pages/constants/constants'))
			.set('@containers', resolve('src/pages/containers'))
			.set('@extend', resolve('src/pages/extend'))
			.set('@mixin', resolve('src/pages/extend/mixin'))
			.set('@router', resolve('src/pages/router')) 
			.set('@store', resolve('src/pages/store'))
			.set('@util', resolve('src/pages/util'))
			.set('@extend', resolve('src/pages/extend'));
			
	},
	devServer: {
		proxy: 'http://localhost:80', 
		// 按情况加...
		
	}
};