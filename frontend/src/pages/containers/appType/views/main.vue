<template>
	<base-view title="应用类型">
		<oa-content/>
	</base-view>
</template>

<script>
import Content from '@components/appType/main/content';
export default {
	name: 'view-container',
	components: {
		'oa-content': Content
	}
};
</script>
