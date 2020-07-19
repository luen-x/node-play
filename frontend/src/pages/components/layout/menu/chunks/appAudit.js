export default {
	name: '应用审核',
	value: "appAudit",
	icon: 'p-setting',
	auth: true,
	route: '/appAudit',
	children: [
		{
			name: '应用审核',
			icon: '',
			auth: true,
			route: '/appAudit/main',

		}
	
	]
};