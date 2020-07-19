<template>
	<div class="c-top-bar">
		<div class="g-ai-c">
			<img src="@assets/logo.png" alt="R" style="width:26px"/>
			<span class="g-fs-20 g-m-l-10">Lawrence<span class="g-fs-14 g-m-l-4">中后台</span></span>
		</div>
		<div class="g-ai-c">
			<span class="g-m-r-8">通知</span>
			<span class="g-m-r-8">设置</span>
			
			<el-dropdown trigger="click" @command="invoke">
				<span class="g-m-r-8 g-pointer" style="color:#fff">{{$global.user.userName}}</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item  command="handleLogout">
						退出登录
					</el-dropdown-item>
					<el-dropdown-item  command="handleChangePwd">
						修改密码
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			
		</div>
	</div>
</template>
<script>
import { Dropdown, DropdownMenu, DropdownItem } from  'element-ui';
import { cleanUser } from '@util/util';
import getChunk from '../menu/getChunk';
export default {
	name: 'c-top-bar',
	components: {
		'el-dropdown': Dropdown,
		'el-dropdown-menu': DropdownMenu,
		'el-dropdown-item': DropdownItem
	},
	data() {
		return {
		};
	},
	computed: {

	},
	methods: {
		invoke(method, ...args){
			this[method](...args);
		},
		handleLogout(){
			this.$confirm.popup({
				content: '确认退出登录吗？'
			}).then((res) => {
				if (!res) return;
				cleanUser();
				this.$router.push('/login');
			});

		},
		handleChangePwd(){

		}

	}
};
</script>
<style lang="scss">
.c-top-bar {
	display: flex;
	justify-content:space-between;
	background: linear-gradient(to right,#0048FF , #6691FF);
	height: 48px;
	padding: 8px 20px;
	color: white;

}
</style>