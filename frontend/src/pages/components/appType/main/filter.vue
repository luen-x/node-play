<template>
	<div>
		<div class="g-flex g-m-b-12 js-filter">
			<div class="g-flex-1">
				<el-input
					v-model="query.categoryName"
					style="width:220px"
					placeholder="请输入类别名称搜索"
					clearable
					@change="handleSearch"
					@close="handleSearch"
				/>
				<el-button type="primary" @click="handleSearch" class="g-m-l-12">搜索</el-button>
			</div>
			<el-button type="primary" @click="addAppType" class="g-m-l-12">新增应用类别</el-button>
			
		</div>
		<slot :query="query"/>
	</div>
</template>
<script>
import { addAppType } from '../_common/modals/addAppType';

export default {
	name: 'comp-',
	components: {
	},
	data() {
		return {
			query: {
				categoryName: this.$route.query.categoryName || '',
			}
		};
	},
	methods: {
		handleSearch(){
			this.$emit('search', this.query);
		},
		addAppType(){
			addAppType.popup({ action: 'add' }).then(() => {
				this.handleSearch();
			}).catch(e => e && console.error(e));

		}
	}
};
</script>
<style lang="scss">
</style>