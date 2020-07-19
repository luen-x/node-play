<template>
	<div>
		<el-tabs :value="curTab" @tab-click="handleTabChange">
			<el-tab-pane v-for="tab in tabs" :key="tab.value" :label="tab.label" :name="tab.value">
				<r-paging
					:loadData="loadData"
					:show="tab.value===curTab"
					:tableOpt="{maxHeight:tableHeight}"
					ref="paging"
				>
					<el-table-column prop="appName" label="应用名称" min-width="120">
						<span class="g-operation" slot-scope="{row}" @click="handleDetail(row)" >{{row.appName}}</span>
					</el-table-column>
					<el-table-column prop="isvName" label="开发商" min-width="120"/>
					<el-table-column prop="catName" label="应用分类" min-width="120"/>
					<el-table-column prop="applyTypeName" label="申请类型" min-width="120"/>
					<el-table-column prop="groupAppVersion" label="版本" min-width="120"/>
					<el-table-column prop="applyTime" label="申请时间" min-width="120"/>
					<el-table-column prop="auditStatusName" label="审核状态" min-width="120"/>
					<el-table-column
						label="操作"
						min-width="120"
					>
						<template #default="it">
							<span class="g-operation" @click="handleDetail(it.row)">详情</span>
						</template>
						
					</el-table-column>
				</r-paging>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
 
<script>
import { filterQuery } from '@util/util';
import Paging from '@common/paging/paging';
import { TableColumn } from 'element-ui';
import { tableHeight } from '@mixin/table-height';
import { recordDetail } from '../_common/drawers/recordDetail';
import map from '../_common/map';

export default {
	name: 'tpl',
	mixins: [tableHeight({ extra: 50 })],

	props: {
		query: Object

	},
	components: {
		'r-paging': Paging,
		'el-table-column': TableColumn,
	},
	data(){
		return {
			curTab: this.$route.query.status || 'auditing',
			tabKey: 'status', // 列表查询接口中tab对应的参数键名
			tabs: [
				{ label: '待审核', value: 'auditing', },
				{ label: '审核通过', value: 'pass' },
				{ label: '审核驳回', value: 'reject' }
			]
		};
	},
	created(){

	},
	beforeDestroy(){

	},
	methods: {
		async loadData(currentPage, pageSize){
			const query = filterQuery({ ...this.query, [this.tabKey]: this.curTab, currentPage, pageSize });
			this.$router.replace({ query });
			return this.$getList('APP_AUDIT_LIST_GET', query).then(res => {

				res.data.forEach(i => {
					i.auditStatusName = map.auditStatus[i.status];
					i.applyTypeName = map.applyType[i.applyType];
				});
				console.log(res);
				return res;
			});
			// await new Promise(r => setTimeout(r, 1000));
			// const data = [];
			// for (let i = 0; i < pageSize; i++){
			// 	data.push({ name: 'aa' + currentPage + pageSize, address: 'address' +  currentPage + pageSize, zip: '666' });
			// }
			// return { 
			// 	pager: { currentPage: currentPage, pageSize: pageSize, total: 100 }, 
			// 	data 
			// };
		},
		search(){
			this.tabs.forEach((tab, index) => {
				if (tab.value === this.curTab){
					this.$refs.paging[index].resetFirst();
				} else {
					this.$refs.paging[index].clearData();
				}
			});
		},
		resetCur(){
			this.tabs.forEach((tab, index) => {
				if (tab.value === this.curTab){
					this.$refs.paging[index].resetCur();
				} else {
					this.$refs.paging[index].clearData();
				}
			});
		},
		handleTabChange(val){
			const type = val.name;
			const index = this.tabs.findIndex(tab => tab.value === type);
			const { currentpage, pageSize } = this.$refs.paging[index].pageData;
			this.$router.replace({
				query: {
					...this.$route.query,
					currentpage,
					pageSize,
					[this.tabKey]: this.curTab
				}
			});
			this.curTab = type;
		},
		handleDetail(row){
			recordDetail.popup({
				record: row,
				resetCur: this.resetCur
			});

		}

	}
};
</script>
 
 <style lang="scss">
 
 </style>