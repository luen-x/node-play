<template>
	<div>
		<div class="js-filter g-m-b-12">
			<el-input
				v-model="query.name"
				style="width:220px"
				placeholder="请输应用别名称搜索"
				clearable
				@change="handleSearch"
				@close="handleSearch"/>
			<el-button type="primary" @click="handleSearch" class="g-m-l-12">搜索</el-button>
		</div>
		<slot :query="query"/>
	</div>
</template>
<script>
export default {
	name: 'comp-',
	components: {
	},
	data() {
		return {
			query: {
				name: this.$route.query.name,
			}
		};
	},
	methods: {
		handleSearch(){
			this.$emit('search', this.query);
		}
	}
};
</script>
<style lang="scss">
</style>