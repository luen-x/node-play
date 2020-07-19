<template>
	<el-drawer
		title="审核详情"
		:visible.sync="visible"
		direction="rtl"
		:modal="false"
		size="520px"
		@close="handleClose"
		
		class="v-app-audit"
	>
		<div v-loading="loading" class="g-fd-c" style="height:100%;" >
			<div class="g-flex-1 g-pd-l-20 g-pd-r-20" style="overflow:auto;height:300px">
				<r-info-item label="名称" :content="info.appName"/>
				<r-info-item label="开发商" :content="info.isvName"/>
				<r-info-item label="应用分类" :content="info.appCategory"/>
				<r-info-item label="类型" :content="info.applyTypeName"/>
				<r-info-item label="版本" >
					<span>{{info.version}}</span>
					<span class="g-operation g-m-l-10" @click="handleDownload" >点击下载</span>
                    
				</r-info-item>
				<r-info-item label="LOGO">
					<img :src="info.logo" class="g-inline-block g-br-4" style="width:32px;height:32px"/>
				</r-info-item>
				<r-info-item label="介绍" :content="info.description"/>
				<r-info-item label="审核状态" :content="info.auditStatusName"/>
				<r-info-item v-if="info.status!=='auditing'" :label="`${info.status==='pass'?'通过':'驳回'}说明`" :content="info.auditRemark"/>
                
			</div>
			<r-footer v-if="record.status==='auditing'" >
				<el-button type="primary" @click="handleAudit('pass')">通过</el-button>
				<el-button  @click="handleAudit('reject')">驳回</el-button>
			</r-footer>

		</div>
	
	</el-drawer>
</template>

<script>
import { Portal } from '@common/portal/portal';
import moment from 'moment';
import { debounce, cloneDeep } from 'lodash';
import { RegEx, setData } from '@util/util';
import InfoItem from '@common/info-item/info-item';
import Footer from '@common/footer/footer';
import { auditApply } from '../modals/auditApply';
import map from '../map';

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
			loading: false,
			info: {
				appName: '',
				isvName: '',
				appCategory: '',
				status: '',
				auditStatusName: '',
				applyType: '',
				applyTypeName: '',
				version: '',
				logo: '',
				description: '',
				auditRemark: ''
			},
			
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
			this.loading = true;
			this.$get('APP_AUDIT_RECORD_DETAIL', { applyId: this.record.applyId }).then(res => {
				res.data.auditStatusName = map.auditStatus[res.data.status];
				res.data.applyTypeName = map.applyType[res.data.applyType];
				this.info = res.data;
				
			}).finally(() => {
				this.loading = false;
			});
            
		},
		handleAudit(type){
			auditApply.popup({ type, applyId: this.record.applyId }).then(() => {
				this.resetCur && this.resetCur();
				this.handleOk();
			}).catch(e => e &&  console.errro(e));

		},
		// handleApprove(){
		// 	this.$post("APP_AUDIT_APPROVE_POST", { applyId: this.record.applyId }).then(res => {
		// 		this.$message.success('审核成功');
		// 		this.resetCur && this.resetCur();
		// 		this.handleOk();
		// 	});
		// },
		// handleReject(){
		// 	this.$post("APP_AUDIT_REJECT_POST", { applyId: this.record.applyId }).then(res => {
		// 		this.$message.success('审核成功');
		// 		this.resetCur && this.resetCur();
		// 		this.handleOk();
		// 	});
		// }
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
export const recordDetail = new Portal(com);
</script>

<style lang="scss">

</style>