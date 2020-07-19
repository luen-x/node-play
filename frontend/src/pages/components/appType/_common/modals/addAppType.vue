<template>
	<el-dialog
		:title="action=='add'?'新增应用类别':'编辑应用类别'"
		:visible="visible"
		@close="handleCancel"
	>
		<el-form
			ref="form"
			:model="formData"
			:rules="rules"
			label-position="right"
			label-width="80px"
			class="g-m-r-20">
			<el-form-item label="名称:" prop="categoryName">
				<el-input v-model="formData.categoryName" placeholder="请输入类别名称" :maxlength="20" clearable ></el-input>
			</el-form-item>
			<el-form-item label="说明:" prop="description" >
				<el-input
					v-model="formData.description"
					placeholder="请输入说明"
					:maxlength="200"
					type="textarea"
					clearable></el-input>
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
		record: Object,
		action: String // add/update

	},
	data() {
		const formData =  {
			categoryName: '',
			description: '',
			status: 'valid'
		};
		if (this.action === 'update'){
			formData.categoryName = this.record.categoryName;
			formData.description = this.record.description;
			formData.id = this.record.id;
		}
		return {
			formData,
			visible: false,
			loading: false,
			rules: {
				categoryName: [{ required: true, type: 'string', message: '请输入类别名称', trigger: 'blur' }],
				description: [{ required: true, type: 'string', message: '请输入类别说明', trigger: 'blur' }],
			}
		};
	},
    
	mounted(){
		this.visible = true;
	},
	
	methods: {
	
		async handleSave(){
			this.loading = true;
			const valid =  await this.$refs.form.validate().catch(() => false);
			if (!valid) return this.loading = false; 
			
			console.log('post', this.formData);
			const url = this.action === 'add' ? 'APP_CATEGORY_CREATE_POST' : "APP_CATEGORY_UPDATE_POST";
			this.$post(url, { ...this.formData }).then(res => {
				this.handleOk();
			}).catch(err => {
				this.loading = false;
			});
			
		},
		handleOk(){
			this.visible = false;
			this.$emit('sure');
		},
		handleCancel(){
			this.visible = false;
			this.$emit('close');
		}
	}
};
export default comp;

export const addAppType = new Portal(comp);

</script>
<style lang="scss">
</style>