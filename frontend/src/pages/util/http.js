import axios from 'axios';
import { API } from '../constants/api';
import { TOKEN_KEY, USER_KEY } from '../constants/constants';
import { Storage, cleanUser } from './util';
import global from '../global/global';

const httpConfig = {
	baseURL: window.location.origin + '/api',
	commonHeaders: {},
	postHeaders: {},
	getHeaders: {},
	requestInterceptors: [
		function setTip(config) {
			if (config.method === 'get' && config.tipSuccess === undefined ) {
				config.tipSuccess = false;
			} else if (config.method === 'post' && config.tipSuccess === undefined) {
				config.tipSuccess = true; // 与后端约定成功的提示前端报，错误的提示后端报
			}
			if (config.tipError === undefined) {
				config.tipError = true;
			}
			return config;
		},
		function parseUrl(config) {
			if (!config.url) {
				throw new Error('url is empty');
			}
			if (!config.url.startsWith('http')) {
				let url = API[config.url];
				if (!url) {
					throw new Error('url:' + config.url + ' is undefined');
				} else {
					config.url = url;
				}
			}
			return config;
		},
		function setToken(config) {
			const token = Storage.get(TOKEN_KEY);
			config.headers.token = token;
			return config;
		}
		// function parseFormData(config) {
		// 	if (config.method === 'post' && config.data) {
		// 		config.originData = config.data;
		// 		config.data = new FormData();
		// 		Object.keys(config.originData).forEach(key => {
		// 			config.data.set(key, config.originData[key]);
		// 		});
		// 	}
		// 	return config;
		// }
	],
	responseInterceptors: [
		function checkToken(response){
			if (response.data.status === -1){
				// window.app.$message.error('登录超时，请重新登录');
				cleanUser();
				// window.app.$global.
				window.app.$router.push('/login');

			} else if (response.headers.token){
				Storage.set(TOKEN_KEY, response.headers.token);
				global.token = response.headers.token;
			}
			return response;

		},
		function tip(response) {
			if (response.data.status === 1 && response.config.tipSuccess) {
				window.app.$message.success(response.data.msg);
			} else if (response.data.status === 0 && response.config.tipError) {
				window.app.$message.error(response.data.msg);
			}
			return response;
		},
		function cleanData(response) {
			console.log(response, response.config.rawData );
			const result = response.config.rawData ? response : response.data;
			if (response.data && response.data.status === 1) {
				return result;
			} throw result;
		}
	]

};
let setted = false;
const setupAxios = ({ baseURL, apis, commonHeaders, postHeaders, getHeaders, requestInterceptors, responseInterceptors }) => {
	if (setted) return;
	axios.defaults.baseURL = baseURL;
	commonHeaders && (axios.defaults.headers.common = { ...axios.defaults.headers.common, ...commonHeaders });
	postHeaders && (axios.defaults.headers.post = { ...axios.defaults.headers.post, ...postHeaders });
	getHeaders && (axios.defaults.headers.get = { ...axios.defaults.headers.post, ...getHeaders });
	requestInterceptors.reverse();
	requestInterceptors.forEach(interceptor => {
		axios.interceptors.request.use(interceptor, (err) => { throw err; });
	});
	responseInterceptors.forEach(interceptor => {
		axios.interceptors.response.use(interceptor, (err) => { throw err; });
	});
	setted = true;
};

const createHttpPlugin = () => {
	setupAxios(httpConfig);
	return {
		install(Vue) {
			Vue.prototype.$http = axios;
			Vue.prototype.$post = axios.post;
			Vue.prototype.$get = (url, params = {}, config = {}) => axios.get(url, { params, ...config });
			Vue.prototype.$getList = (...args) => Vue.prototype.$get(...args); // 后续对列表的额外处理可以加在这里
		}
	};

};
export default createHttpPlugin();

// config中增加关键字rawData，为true则会返回所有的响应信息，默认false
// post请求默认情况下会自动toast提示请求返回的msg，可以通过tipSuccse=false关闭
// get请求默认不会提示msg，可用tipSuccess=true开启
// 请求如果失败了（success是false）默认自动会toast提示msg，可通过tipError=false关闭

// example:
/**
 * this.$get("API_USER_NAME",{id:123}).then()
 * this.$get("API_USER_NAME",{id:123},{tipError:false,tipSuccess:false,rawData:true}).then()
 * 
 * axios 完整配置 http://www.axios-js.com/zh-cn/docs/#%E8%AF%B7%E6%B1%82%E9%85%8D%E7%BD%AE
 * 
 */