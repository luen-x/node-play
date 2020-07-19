export default {
	name: '开发商列表',
	value: "setting",
	icon: 'p-setting',
	auth: true,
	route: '/developerList',
	children: [
		{
			name: '开发商列表',
			icon: '',
			auth: true,
			route: '/developerList/main',

		}
	
	]
};