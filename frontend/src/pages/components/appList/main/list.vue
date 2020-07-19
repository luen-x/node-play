<template>
	<div>
		<r-paging
			:loadData="loadData"
			:tableOpt="{maxHeight:tableHeight}"

			ref="paging"
		>
			<el-table-column
				prop="appName"
				label="应用名称"
				min-width="120">
				<template #default="{row}">
					<span class="g-operation" @click="handleDetail(row)">{{row.appName}}</span>

				</template>
				
			</el-table-column>
			<el-table-column
				prop="isvName"
				label="开发商"
				min-width="120">
			</el-table-column>
			<el-table-column
				prop="appCategoryName"
				label="应用分类"
				min-width="120">
			</el-table-column>
			<el-table-column
				prop="appStatusName"
				label="状态"
				min-width="120">
			</el-table-column>
			<el-table-column
				prop="version"
				label="版本"
				min-width="120">
			</el-table-column>
			<el-table-column
				prop="applyTime"
				label="申请时间"
				min-width="120">
			</el-table-column>
			<el-table-column
				prop="applyResultName"
				label="审核结果"
				min-width="120">
			</el-table-column>
			<el-table-column
				prop="approveTime"
				label="审核时间"
				min-width="120">
			</el-table-column>
			<!-- <el-table-column
				prop=""
				label="操作"
				min-width="120"
			>
				<span class="g-operation" @click="handleTestPop">操作</span>
			</el-table-column> -->
		</r-paging>
        
	</div>
</template>
 
<script>
import { filterQuery } from '@util/util';
import Paging from '@common/paging/paging';
import { TableColumn } from 'element-ui';
import { tableHeight } from '@mixin/table-height';
import { appDetail } from '../_common/drawers/appDetail';
import map from '../_common/map';

export default {
	name: 'tpl',
	mixins: [tableHeight()],

	props: {
		query: Object

	},
	components: {
		'r-paging': Paging,
		'el-table-column': TableColumn

	},
	created(){

	},
	beforeDestroy(){

	},
	methods: {
		async loadData(currentPage, pageSize){
		
			const query = filterQuery({ ...this.query, currentPage, pageSize });
			this.$router.replace({ query });
			return this.$getList('APP_APP_LIST_GET', query).then(res => {
				res.data.forEach(i => {
					i.appStatusName = map.appStatus[i.appStatus];
					i.applyResultName = map.applyResult[i.applyResult];
				});
				return res;
			});
			// await new Promise(r => setTimeout(r, 1000));
			// const data = [];
			// for (let i = 0; i < pageSize; i++){
			// 	data.push({ name: 'aa' + currentPage + pageSize, address: 'address' +  currentPage + pageSize, zip: '666' });
			// }
             
			// return { 
			// 	pager: { currentPage, pageSize: pageSize, total: 100 }, 
			// 	data
			// };
		},
		search(){
			this.$refs.paging.resetFirst();
		},
		resetCur(){
			this.$refs.paging.resetCur();
		},
		handleDetail(row){
			appDetail.popup({
				record: row,

			});

		}

	}
};
</script>
 
 <style lang="scss">
 
 </style>