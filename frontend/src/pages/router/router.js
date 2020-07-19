import Vue from 'vue';
import Router from 'vue-router';
import routeConfig from './routes';
import { beforeEach, afterEach } from './hooks';

console.log(routeConfig);
Vue.use(Router);

const router = new Router(routeConfig);

router.beforeEach(beforeEach);
router.afterEach(afterEach);
router.onError((error) => {
	if (error.message.match(/Loading chunk (\d)+ failed/g)) {
		location.reload(true);
	}
});
// 隐藏replace的 NavigationDuplicated 报错
const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location, onResolve, onReject) {
	if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject);
	return originalReplace.call(this, location).catch(err => { 
		if (err && err._isRouter && err.type === 4) return;
		throw err;
	});
};
export default router;

