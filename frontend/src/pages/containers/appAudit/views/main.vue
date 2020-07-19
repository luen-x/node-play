<template>
	<base-view title="应用审核">
		<oa-content/>
	</base-view>
</template>

<script>
import Content from '@components/appAudit/main/content';
export default {
	name: 'view-container',
	components: {
		'oa-content': Content
	}
};
</script>
