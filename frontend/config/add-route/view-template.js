
module.exports.getViewFile = (paths) => {
	return `<template>
	<base-view title="title">
		<oa-content/>
	</base-view>
</template>

<script>
import Content from '@components/${paths[0]}/${paths.filter((i, index) => index > 0).join('-')}/content';
export default {
	name: 'view-container',
	components: {
		'oa-content': Content
	}
};
</script>
`;

};