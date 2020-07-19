export default {
	name: '动销引流',
	value: "attract",
	icon: 'p-marketing',
	auth: true,
	route: '/attract',
	children: [
		{
			name: '引流活动',
			icon: '',
			auth: true,
			route: '/attract/activity',
		},
		{
			name: '引流工具',
			icon: '',
			auth: true,
			route: '/attract/tool',

		}

	]
};
