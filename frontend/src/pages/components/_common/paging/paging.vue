<template>
	<div>
		<el-table
			v-loading="loading"
			:data="curPageData||[]"
			stripe
			v-bind="tableOption"
		>
			<slot slot-scope="data" :data="data"/>
		</el-table>
		<div class="g-flex g-m-t-12">
			<div class="g-flex-1"><slot name="extra"/></div>
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="pageData.currentPage"
				:page-sizes="[10, 20, 30]"
				:page-size="pageData.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="pageData.total"
				v-bind="pageOption"
			>
			</el-pagination>
		</div>
	</div>
</template>
<script>
import { Table, TableColumn, Pagination } from 'element-ui';

const defaultTableOpt = {

};
const defaultPageOpt = {
	
};

// const getDefaultPageData = (history, pageSize) => {
// 	const result = {
// 		data: {
// 			1: undefined // 每页数据,undefined 代表未加载
// 		},
// 		currentPage: 1,
// 		total: 0,
// 		pageSize: 20,
// 	};
// 	if (history){
// 		result.currentPage = +window.app.$route.query.currentPage || 1,
// 		result.pageSize = +window.app.$route.query.pageSize || 20;
        
// 	}
// 	return result;
// };

export default {
	name: 'comp-',
	components: {
		'el-table': Table,
		// 'el-table-column': TableColumn,
		'el-pagination': Pagination
	},
	props: {
		loadData: Function,
		show: { // 多个tab时控制其他tab暂时不加载
			type: Boolean, 
			default: true
		},
		history: { // 是否从浏览器地址读取分页数据
			type: Boolean,
			default: true,
           
		},
		tableOpt: {
			type: Object,
			default: () => ({})
		},
		pageOpt: {
			type: Object,
			default: () => ({})

		}

	},
	data() {
		return {
			pageData: this.getDefaultPageData(),
			loading: false
            
		};
	},
	computed: {
		tableOption(){
			return { ...defaultTableOpt, ...this.tableOpt };
		},
		pageOption(){
			return { ...defaultPageOpt, ...this.pageOpt };
		},
		curPageData(){
			return this.pageData.data[this.pageData.currentPage];
		}
	},
	watch: {
		show: {
			immediate: true,
			handler(val){
				if (val && this.curPageData === undefined){
					this._loadData();

				}

			}
		}
	},
	mounted(){

	},
	methods: {
		_loadData(){
			this.replaceQuery();
			if (this.curPageData) return;
			this.loading = true;
			this.loadData(this.pageData.currentPage, this.pageData.pageSize).then(res => {
				const { data, pager } = res;
				this.pageData.currentPage = +pager.currentPage;
				this.pageData.total = +pager.total;
				this.pageData.pageSize = +pager.pageSize;
				this.$set(this.pageData.data, pager.currentPage, data);
				// this.pageData.data[pager.currentPage] = data;
			}).catch(e => {
				console.error('分页数据异常', e);
			}).finally(() => {
				this.loading = false;
			});

		},
		getDefaultPageData()  {
			const result = {
				data: {
					1: undefined // 每页数据,undefined 代表未加载
				},
				currentPage: 1,
				total: 0,
				pageSize: 20,
			};
			if (this.pageData){
				result.currentPage = this.pageData.currentPage,
				result.pageSize = this.pageData.pageSize;
			} else if (this.history){
				result.currentPage = +window.app.$route.query.currentPage || 1,
				result.pageSize = +window.app.$route.query.pageSize || 20;
			}
			
			return result;
		},
		clearData(){
			this.pageData = this.getDefaultPageData();
		},
		resetFirst(){ // 跳转到第一页刷新列表，清除其他页的数据
			this.pageData = this.getDefaultPageData();
			this.pageData.currentPage = 1;
			this._loadData();
		},
		resetCur(){ // 当前页刷新新列表，清除其他页的数据
			this.pageData.data = {};
			this._loadData();

		},
		handleSizeChange(size){
			console.log('handleSizeChange', size);
			this.pageData.pageSize = size;

			this.resetFirst();
		},
		handleCurrentChange(page){
			this.pageData.currentPage = page;
			this._loadData();

		},
		replaceQuery(){
			if (this.history){
				const query = { ...this.$route.query, currentPage: this.pageData.currentPage, pageSize: this.pageData.pageSize };
				this.$router.replace({
					path: this.$route.path,
					query
				});
			}

		}

	}
};
</script>
<style lang="scss">
</style>