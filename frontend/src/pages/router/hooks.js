import getChunk from '@components/layout/menu/getChunk';
import global from '../global/global';
export const beforeEach = (to, from, next) => {
	console.log(111, to.path);
	const paths = to.path.split('/').filter(Boolean);
	if (paths.length === 0) {
		const chunks = getChunk(global.auth, '', true);
		if (chunks[0]) {
			next(chunks[0].children[0].route).catch;
			return;
		}
	} else if (paths.length === 1) {
		const chunks = getChunk(global.auth, '/' + paths[0], false);
		if (chunks[0]) {
			next(chunks[0].route);
			return;
		}
	} 
	next();

};
export const afterEach = (route => {
	
});