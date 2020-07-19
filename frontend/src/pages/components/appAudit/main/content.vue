<template>
	<div>
		<r-filter @search="handleSearch">
			<r-tab-list ref="list" slot-scope="{query}" :query="query" />
		</r-filter>
	</div>
</template>
<script>
import TabList from './tab-list';
import Filter from './filter';

export default {
	name: 'comp-',
	components: {
		'r-tab-list': TabList,
		'r-filter': Filter
	},
	data() {
		return {
		};
	},
	methods: {
		handleSearch(query){
			this.$refs.list.search();

		}
	}
};
</script>
<style lang="scss">
</style>