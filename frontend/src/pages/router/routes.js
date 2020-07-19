import { PRE_ROUTER_URL } from '../constants/constants';
import Layout from "@components/layout/layout";
import Login from "@components/login/login";

import appAuditConfig  from '../containers/appAudit/app';
import appListConfig  from '../containers/appList/app';
import appTypeConfig  from '../containers/appType/app';

const routeConfig = {
	base: PRE_ROUTER_URL,
	mode: 'history',
	routes: [
		{
			path: "/login",
			component: Login
		},
		{
			path: '/',
			component: Layout,
			children: [
				...appAuditConfig,
				...appListConfig,
				...appTypeConfig
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
