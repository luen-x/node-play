
import routes from './chunks/root';

const cacheChunk = {
	auth: undefined,
	chunk: []
};

/**
 * 过滤掉没有权限的路由
 * @param {*} chunk 
 * @param {*} auth 
 */
const getFilterChunk = (chunk, auth) => {
	const result = chunk.filter(ch => {
		const show = ch.auth === true || auth[ch.auth];
		if (show && ch.children && ch.children.length) {
			ch.children = getFilterChunk(ch.children, auth);
		}
		return show;
	});
	return result;
};

/**
 * 获得所有有权限的路由树结构，根据auth对结果做缓存
 * @param {*} auth 
 */
const getAllChunk = (auth = {}) => {
	if (auth === cacheChunk.auth) {
		return cacheChunk.chunk;
	}
	const filterChunk = getFilterChunk(routes, auth);
	cacheChunk.chunk = filterChunk;
	cacheChunk.auth = auth;
	return filterChunk;
};

/**
 * 获得子路由树结构
 * @param {*} chunk 
 * @param {*} route 
 */
const getChildChunk = (chunk, route) => {
	if (!route) {
		return chunk || [];
	}
	for (let i = 0; i < chunk.length; i++) {
		if (route === chunk[i].route) {
			return chunk[i].children || [];
		}
		if (chunk[i].children && chunk[i].children.length) {
			const exist = getChildChunk(chunk[i].children, route);
			if (exist) return exist;
		}
	}
};

/**
 * 根据一个路由去获取它的下级路由，如果route为空则获取一级路由
 * @param {OBject} auth 
 * @param {String} route 路由地址
 * @param {Boolean} deep 是否获取子级路由，默认false
 */
const getChunk = (auth = {}, route, deep) => {
	console.log(2233);
	const allChunk = getAllChunk(auth);
	let childChunk = getChildChunk(allChunk, route) || [];
	if (!deep) {
		childChunk = childChunk.map(it => {
			it = { ...it };
			delete it.children;
			return it;
		});
	}
	return childChunk;
};
export default getChunk;