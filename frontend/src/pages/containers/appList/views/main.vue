<template>
	<base-view title="应用列表">
		<oa-content/>
	</base-view>
</template>

<script>
import Content from '@components/appList/main/content';
export default {
	name: 'view-container',
	components: {
		'oa-content': Content
	}
};
</script>
