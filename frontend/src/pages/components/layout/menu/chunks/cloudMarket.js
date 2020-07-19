export default {
	name: '发布云市场',
	value: "cloudMarket",
	icon: 'p-setting',
	auth: true,
	route: '/cloudMarket',
	children: [
		{
			name: '发布云市场',
			icon: '',
			auth: true,
			route: '/cloudMarket/main',

		}
	
	]
};