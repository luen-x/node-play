import { Storage } from '@util/util';
import { USER_KEY, TOKEN_KEY } from '@constants/constants';
const global = {
	auth: {},
	config: {},
	user: Storage.get(USER_KEY) || {},
	token: Storage.get(TOKEN_KEY) || ''
};
export default global;
window._global = global; // 便于开发调试配置，原则上不调用

