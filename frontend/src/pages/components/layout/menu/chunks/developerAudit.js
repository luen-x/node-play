export default {
	name: '开发商审核',
	value: "developerAudit",
	icon: 'p-setting',
	auth: true,
	route: '/developerAudit',
	children: [
		{
			name: '开发商审核',
			icon: '',
			auth: true,
			route: '/developerAudit/main',

		}
	
	]
};