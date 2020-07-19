export default {
	name: '应用列表',
	value: "appList",
	icon: 'p-setting',
	auth: true,
	route: '/appList',
	children: [
		{
			name: '应用列表',
			icon: '',
			auth: true,
			route: '/appList/main',

		}
	
	]
};