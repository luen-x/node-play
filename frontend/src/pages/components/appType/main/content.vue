<template>
	<div>
		<r-filter @search="handleSearch">
			<r-list ref="list" slot-scope="{query}" :query="query" />
		</r-filter>
		
	</div>
</template>
<script>
import List from './list';
import Filter from './filter';

export default {
	name: 'comp-',
	components: {
		'r-list': List,
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