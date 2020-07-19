<template>
	<div class="v-login g-flex-center" >
		<el-form :model="formData" ref="form" label-width="80px">
			<el-form-item label="UserName" prop="userName">
				<el-input v-model="formData.userName" placeholder="userName" maxlength="20"></el-input>
			</el-form-item>
			<el-form-item label="Account" prop="accout">
				<el-input v-model="formData.account" placeholder="account" maxlength="20"></el-input>
			</el-form-item>
			<el-form-item label="Password" prop="password">
				<el-input v-model="formData.password" placeholder="password" type="password" maxlength="20"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleLogin">Login</el-button>
				<el-button @click="handleRegister">Register</el-button>
			</el-form-item>
		</el-form>
		
	</div>
  
</template>

<script>
import { Storage } from '@util/util';
import { USER_KEY } from '@constants/constants';
export default {
	name: "login",
	data(){
		return {
			formData: {
				userName: '',
				account: '',
				password: ""
				
			}
			
		};
	},
	methods: {
		handleLogin(){
			this.$refs.form.validate().then(() => {
				this.$post('USER_LOGIN', {
					...this.formData
				},).then((res) => {
					console.log(res);
					// Storage.set(TOKEN_KEY, res.headers.token);
					Storage.set(USER_KEY, res.data.user);
					this.$global.user = res.data.user;
					// this.$global.token = res.headers.token;
					// Storage.set('user', res.data);

					this.$router.push('/appList/main');
				});
			}); 

		},
		handleRegister(){
			this.$refs.form.validate().then(() => {
				this.$post('USER_REGISTER', {
					...this.formData
				});
			});

		}

	}

};
</script>

<style lang="scss">
.v-login {
	height: 100vh;
	width: 100vh
}

</style>