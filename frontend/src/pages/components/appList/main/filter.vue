<template>
	<div>
		<div class="js-filter g-m-b-12">
			<el-input
				v-model="query.name"
				class="g-m-r-12"
				style="width:220px"
				placeholder="请输应用别名称搜索"
				clearable
				@change="handleSearch"
				@close="handleSearch"
			/>
			<el-select
				v-model="query.status"
				placeholder="请选择应用状态"
				class="g-m-r-12"
				style="width:220px"
				clearable  
				@change="handleSearch"
			>
				<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				/>
			</el-select>
			<el-button type="primary" @click="handleSearch" class="g-m-l-8">搜索</el-button>
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
				status: this.$route.query.status || 'shelve',
			},
			options: [
				{ label: '已上架', value: 'shelve' },
				{ label: '已下架', value: 'unshelve' }
			]

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