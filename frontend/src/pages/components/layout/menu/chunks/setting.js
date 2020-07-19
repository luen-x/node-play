export default {
	name: '系统设置',
	value: "setting",
	icon: 'p-setting',
	auth: true,
	route: '/setting',
	children: [
		{
			name: '基础设置',
			icon: '',
			auth: true,
			route: '/setting/base',

		},
		{
			name: '操作日志',
			icon: '',
			auth: true,
			route: '/setting/opration',

		}
	
	]
};