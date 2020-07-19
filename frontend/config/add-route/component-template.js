module.exports.getComponentFile = (paths, type) => {
	if (type === 'basic'){
		return `<template>
	<div>
		${paths.join('-')} basic
	</div>
</template>
 
<script>
export default {
	name: '${paths.join('-')}-content',
	props: {

	},
	components: {

	},
	created(){

	},
	beforeDestroy(){

	},
	methods: {

	}
};
</script>
 
 <style lang="scss">
 
 </style>`;
	
	} else if (type === 'filter'){
		return `<template>
	<div>
		<div class="js-filter g-m-b-12">
			<el-input
				v-model="query.name"
				style="width:220px"
				placeholder="请搜索"
				clearable
				@change="handleSearch"
				@close="handleSearch"
			/>

			<el-button type="primary" @click="handleSearch" class="g-m-l-22">搜索</el-button>
		</div>
		<slot :query="query"/>
	</div>
</template>
<script>
export default {
	name: '${paths.join('-')}-filter',
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
</style>`;
	} else if (type === 'list'){
		return `<template>
	<div>
		<r-paging
			:loadData="loadData"
			:tableOpt="{maxHeight:tableHeight}"
			ref="paging"
		>
			<el-table-column
				prop="name"
				label="应用名称"
				min-width="120">
				<template #default="{row}">
					<span class="g-operation" @click="handleDetail(row)">{{row.name}}</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="address"
				label="开发商"
				min-width="120">
			</el-table-column>
			<el-table-column
				prop="zip"
				label="应用分类"
				min-width="120">
			</el-table-column>

			<el-table-column
				prop=""
				label="操作"
				width="100"
				fixed="right"
			>
				<template #default="it">
					<span  class="g-operation" @click="handleDetail(it.row)">详情</span>
					<span  class="g-operation g-m-l-12" @click="handleDetail(it.row)">编辑</span>
				</template>
			</el-table-column>
		</r-paging>
		
	</div>
</template>
	
<script>
import Paging from '@common/paging/paging';
import { TableColumn } from 'element-ui';
import { tableHeight } from '@mixin/table-height';
import { filterQuery } from '@util/util'

export default {
	name: '${paths.join('-')}-list',
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
			// const query = filterQuery({ ...this.query, currentPage, pageSize });
			// this.$router.replace({ query });
			// return this.$getList('API', query).then(res => {
			// 	res.data.forEach(i => {

			// 	});
			// 	return res;
			// });
			
			await new Promise(r => setTimeout(r, 1000));
			const data = [];
			for (let i = 0; i < pageSize; i++){
				data.push({ name: 'aa' + currentPage + pageSize, address: 'address' +  currentPage + pageSize, zip: '666' });
			}
			
			return { 
				pager: { currentPage, pageSize: pageSize, total: 100 }, 
				data
			};
		},
		search(){
			this.$refs.paging.resetFirst();
		},
		resetCur(){
			this.$refs.paging.resetCur();
		},
		handleDetail(row){


		}

	}
};
</script>
	
<style lang="scss">

</style>`;

	} else if (type === 'tab-list'){
		return `<template>
	<div>
		<el-tabs :value="curTab" @tab-click="handleTabChange">
			<el-tab-pane v-for="tab in tabs" :key="tab.value" :label="tab.label" :name="tab.value">
				<r-paging
					:loadData="loadData"
					:show="tab.value===curTab"
					:tableOpt="{maxHeight:tableHeight}"
					ref="paging"
				>
					<el-table-column prop="name" label="应用名称" min-width="120">
						<span class="g-operation" slot-scope="{row}" @click="handleDetail(row)" >{{row.name}}</span>
					</el-table-column>
					<el-table-column prop="address" label="开发商" min-width="120"/>
	
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
import Paging from '@common/paging/paging';
import { TableColumn } from 'element-ui';
import { tableHeight } from '@mixin/table-height';
import { filterQuery } from '@util/util'

export default {
	name: '${paths.join('-')}-list',
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
			curTab: '1',
			tabKey: 'status', // 列表查询接口中tab对应的参数键名
			tabs: [
				{ label: '待审核', value: '1', },
				{ label: '审核通过', value: '2' },
				{ label: '审核驳回', value: '3' }
			]
		};
	},
	created(){

	},
	beforeDestroy(){

	},
	methods: {
		async loadData(currentPage, pageSize){
			// const query = filterQuery({ ...this.query, [this.tabKey]: this.curTab, currentPage, pageSize });
			// this.$router.replace({ query });
			// return this.$getList('', query).then(res => {

			// 	res.data.forEach(i => {

			// 	});
			// 	return res;
			// });
			await new Promise(r => setTimeout(r, 1000));
			const data = [];
			for (let i = 0; i < pageSize; i++){
				data.push({ name: 'aa' + currentPage + pageSize, address: 'address' +  currentPage + pageSize, zip: '666' });
			}
			return { 
				pager: { currentPage, pageSize: pageSize, total: 100 }, 
				data 
			};
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
			const { currentpage: page, pageSize } = this.$refs.paging[index].pageData;
			this.$router.replace({
				query: {
					...this.$route.query,
					page,
					pageSize,
					[this.tabKey]: this.curTab
				}
			});
			this.curTab = type;
		},
		handleDetail(row){
			

		}

	}
};
</script>
	
<style lang="scss">

</style>`;
	} else if (type === 'list-content'){
		return `<template>
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
	name: '${paths.join('-')}-content',
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
</style>`;
	} else if (type === 'tab-list-content'){
		return `<template>
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
	name: '${paths.join('-')}-content',
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
</style>`;
	}
};