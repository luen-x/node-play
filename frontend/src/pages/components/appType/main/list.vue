<template>
	<div>
		<r-paging
			:loadData="loadData"
			:tableOpt="{maxHeight:tableHeight}"
			ref="paging"
		>
			<el-table-column
				prop="categoryName"
				label="类别"
				min-width="120">
			</el-table-column>
			<el-table-column
				prop="description"
				label="说明"
				min-width="120">
			</el-table-column>
			<el-table-column
				prop="statusName"
				label="状态"
				min-width="120">
			</el-table-column>
			<el-table-column
				prop=""
				label="操作"
				min-width="120"
			>
				<template #default="{row}">
					<!-- <span @click="handleView(row)">查看</span> -->
					<span class="g-operation g-m-r-8" @click="handleEdit(row)">编辑</span>
					<span v-if="row.status=='valid'" class="g-pointer g-c-red-mid" @click="handleForbid(row)">禁用</span>
					<span v-else class="g-pointer  g-c-red-mid" @click="handleOpen(row)">启用</span>
				</template>
			</el-table-column>
			
		</r-paging>
        
	</div>
</template>
 
<script>
import { filterQuery } from '@util/util';
import Paging from '@common/paging/paging';
import { TableColumn } from 'element-ui';
import { tableHeight } from '@mixin/table-height';
import { addAppType } from '../_common/modals/addAppType';

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
	data(){
		return {
			statusMap: {
				valid: '正常',
				forbidden: "禁用"
			}
		};

	},
	created(){

	},
	beforeDestroy(){

	},
	methods: {
		async loadData(currentPage, pageSize){
			const query = filterQuery({ ...this.query, currentPage, pageSize });
			this.$router.replace({ query });
			return this.$getList('APP_CATEGORY_LIST_GET', query).then(res => {
				res.data.forEach(i => {
					i.statusName = this.statusMap[i.status] || '--';
				});
				return res;
			});

		},
		search(){
			this.$refs.paging.resetFirst();
		},
		resetCur(){
			this.$refs.paging.resetCur();
		},
		handleTestPop(){

		},
		handleEdit(row){
			addAppType.popup({ action: "update", record: row }).then(() => {
				this.resetCur();
			}).catch(e => e && console.error(err));

		},
		handleForbid(row){
			this.$confirm.popup({
				title: '提示',
				status: 'warn',
				content: "确定禁用" + row.categoryName + "吗？",
				onOk: () => {
					return this.$post('APP_CATEGORY_UPDATE_AUDIT_INFO_POST', { id: row.id, status: 'forbidden' }).then(() => this.resetCur());
				}

			});

		},
		handleOpen(row){
			this.$confirm.popup({
				title: '提示',
				content: "确定启用" + row.categoryName + "吗？",
				onOk: () => {
					return this.$post('APP_CATEGORY_UPDATE_AUDIT_INFO_POST', { id: row.id, status: 'valid' }).then(() => this.resetCur());
				}

			});

		}

	}
};
</script>
 
 <style lang="scss">
 
 </style>