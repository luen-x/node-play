<template>
	<el-drawer
		title="应用详情"
		:visible.sync="visible"
		direction="rtl"
		:modal="false"
		size="520px"
		@close="handleClose"
		
		class="v-app-list-detail"
	>
		<div v-loading="loading" class="g-fd-c" style="height:100%;" >
			<div class="g-flex-1 g-pd-l-20 g-pd-r-20" style="overflow:auto;height:300px">
				<r-info-item label="名称" :content="info.appName"/>
				<r-info-item label="开发商" :content="info.isvName"/>
				<r-info-item label="应用分类" :content="info.appCategory"/>
				<!-- <r-info-item label="类型" :content="info."/> -->
				<r-info-item label="版本" >
					<span>{{info.version}}</span>
					<span class="g-operation g-m-l-10" @click="handleDownload" >点击下载</span>
                    
				</r-info-item>
				<r-info-item label="LOGO">
					<img :src="info.logo" class="g-inline-block g-br-4 " style="width:32px;height:32px"/>
				</r-info-item>
				<r-info-item label="介绍" :content="info.description"/>
                
			</div>
			<!-- <r-footer>
				<el-button type="primary" @click="handleSave">确定</el-button>
				<el-button  @click="handleClose">取消</el-button>

			</r-footer> -->

		</div>
	
	</el-drawer>
</template>

<script>
import { Portal } from '@common/portal/portal';
import { debounce, cloneDeep } from 'lodash';
import { RegEx, setData } from '@util/util';
import InfoItem from '@common/info-item/info-item';
import Footer from '@common/footer/footer';

const com =  {
	name: "developList-addDeveloper",
	components: {
		// 'r-drawer': Drawer
		'r-info-item': InfoItem,
		'r-footer': Footer

	},
	props: {
		record: Object,
		
		resetFirst: Function,
		resetCur: Function,
	},
	data() {
		return {
			visible: false,
			info: {
				appName: '',
				description: '',
				appCategory: '',
				logo: '',
				version: '',
				isvName: '',
			},
			options: [],
			formData: {
				id: '',
				version: 1
			},
			loading: false
			
		};
	},
	watch: {
		
		record(val){
			this.loadData();

		}

	},
	mounted(){
		this.visible = true;
		
		this.loadData();
		
	},
	
	methods: {
		handleOk(){
			this.visible = false;
			this.$emit('sure');

		},
		handleClose(){
			this.visible = false;
			this.$emit('close');
		},
		loadData(){
			console.log(this.record);
			this.loading = true;
			this.$get('APP_APP_DETAIL_GET', { appId: this.record.id }).then(res => {
				this.info = res.data;
			}).finally(() => {
				this.loading = false;
			});
            
		},

		handleSave(){
			if (this.formData.version !== this.record.version){
				this.$post('', {}).then(() => {
					this.resetCur();
				});
			} else {
				this.handleOk();
			}
		},
		handleDownload(){
			if (!this.info.downloadUrl){
				this.$message.error('暂不支持下载此版本的应用');
				return;
			} else {
				window.open(this.info.downloadUrl);

			}
			
		}
		
	}
};
export default com;
export const appDetail = new Portal(com);
</script>

<style lang="scss">

</style>