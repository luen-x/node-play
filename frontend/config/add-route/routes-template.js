const getImportLines = (modules) => {
	return modules.map(name => {
		return `import ${name}Config  from '../containers/${name}/app';`;
	}).join('\n');
};
const getRouteLines = (modules) => {
	return modules.map((name, index) => {
		return `${'\t'.repeat(4)}...${name}Config${index == modules.length - 1 ? '' : ','}`;
	}).join('\n');
};

const getRoutesFile = modules => `import { PRE_ROUTER_URL } from '../constants/constants';
import Layout from "@components/layout/layout";
import Login from "@components/login/login";

${getImportLines(modules)}

const routeConfig = {
	base: PRE_ROUTER_URL,
	mode: 'history',
	routes: [
		{
			path:"/login",
			component:Login
		},
		{
			path: '/',
			component: Layout,
			children: [
${getRouteLines(modules)}
			]
		},
		{
			path: '*',
			name: "404",
			component: () => import('../components/layout/404.vue')
			
		}
	]
};
export default routeConfig;
`;
module.exports.getRoutesFile =  getRoutesFile;
