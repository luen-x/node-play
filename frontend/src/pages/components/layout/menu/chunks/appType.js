export default {
	name: '应用类别',
	value: "appType",
	icon: 'p-setting',
	auth: true,
	route: '/appType',
	children: [
		{
			name: '应用类别',
			icon: '',
			auth: true,
			route: '/appType/main',

		}
	
	]
};