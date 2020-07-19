<template>
	<el-dialog
		:title="type==='pass'?'审核通过':'审核驳回'"
		:visible="visible"
		@close="handleCancel"
	>
		<el-form
			:model="formData"
			ref="form"
			:rules="rules"
			label-width="100px"
			@submit.native.prevent
		>
			<el-form-item :label="type==='pass'?'通过说明:':'驳回说明:'" prop="message">
				<el-input
					type="textarea"
					v-model="formData.message"
					:rows="4"
					style="width:300px"
					:placeholder="`请输入${type==='pass'?'通过':'驳回'}说明`"
				/>
			</el-form-item>
			
		</el-form>
        
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" :loading="loading" @click="handleSave">确 定</el-button>
			<el-button type="ghost" @click="handleCancel">取 消</el-button>
		</span>
	</el-dialog>
	
</template>
<script>
import { Portal } from '@common/portal/portal';
const comp = {
	name: 'c-confirm',
	components: {
	},
	props: {
		type: String, // pass / reject
		applyId: [String, Number]

	},
	data() {
		return {
			visible: false,
			loading: false,
			titleMap: {
				pass: '审核通过',
				reject: "审核驳回"
			},
			formData: {
				applyId: this.applyId,
				message: ''
			},
			rules: {
				message: [{ required: true, type: 'string', message: `请输入${this.type === 'pass' ? '通过' : '驳回'}说明`, trigger: "blur" }]
			}
            
		};
	},
	computed: {

	},
	mounted(){
		this.visible = true;
	},
	
	methods: {
		
		handleOk(){
			this.visible = false;
			this.$emit('sure');
			
		},
		handleCancel(){
			this.visible = false;
			this.$emit('close');
			
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
		// },
		handleSave(){
			let url = "APP_AUDIT_APPROVE_POST";
			if (this.type === 'reject'){
				url = "APP_AUDIT_REJECT_POST";
			}
			this.$post(url, { ...this.formData }).then(() => {
				this.$message.success('审核成功');
				this.handleOk();
			});
            
		}
		
	}
};
export default comp;

export const auditApply = new Portal(comp);

</script>
<style lang="scss">
</style>