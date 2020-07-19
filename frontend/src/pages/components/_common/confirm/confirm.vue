<template>
	<el-dialog
		:title="title"
		:visible="visible"
		@close="handleCancel"
	>
		<div class="g-flex">
			<div v-if="status" class="g-flex-0 g-m-r-16">
				<i :class="statusIcon[status]" class="g-fs-24"/>
			</div>
			<div class="g-flex-1 g-fs-16">{{content}}</div>

		</div>
		
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" :loading="loading" @click="handleOk">确 定</el-button>
			<el-button type="ghost" @click="handleCancel">取 消</el-button>
		</span>
	</el-dialog>
	
</template>
<script>
import { Portal } from '../portal/portal';
const comp = {
	name: 'c-confirm',
	components: {
	},
	props: {
		title: {
			type: String,
			default: '提示'
		},
		content: {
			type: String,
			default: '确定？'
		},
		status: {
			type: String,
			default: '' // warn/error/success/info
		},
		onOk: Function,
		onCancel: Function

	},
	data() {
		return {
			visible: false,
			loading: false,
			statusIcon: {
				warn: 'el-icon-warning g-c-yellow-mid',
				error: 'el-icon-error g-c-red-mid',
				success: 'el-icon-success g-c-green-mid',
				info: 'el-icon-info g-c-blue-mid'
			}
		};
	},
	mounted(){
		this.visible = true;
	},
	
	methods: {
		close(result){
			this.visible = false;
			this.$emit('sure', result);
		},
		handleOk(){
			if (this.onOk){
				this.loading = true;
				this.onOk()
					.then((res) => res !== false && this.close(true))
					.catch(e => e && console.error(e))
					.finally(() => this.loading = false);
			} else {
				this.close(true);
			}
			
		},
		handleCancel(){
			this.close(false);
		}
	}
};
export default comp;

export const confirm = new Portal(comp);

</script>
<style lang="scss">
</style>