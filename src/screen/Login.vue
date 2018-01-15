<template>
	<el-form class="login-form">
		<h3>后台管理系统</h3>
		<el-form-item >
			<el-input type="text"  auto-complete="off" placeholder="账号"></el-input>
		</el-form-item>
		<el-form-item>
			<el-input type="password"  auto-complete="off" placeholder="密码"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" class="btn" @click.native.prevent="submit">登录</el-button>
		</el-form-item>
	</el-form>
</template>
<script>
	import axios from 'axios';
	export default {
		data(){
			return{

			}
		},
		methods: {
			submit(){
				sessionStorage.setItem('lg', (new Date()).getTime());
				this.$router.push({
					path: '/'
				})
			}
		}
	}
</script>
<style scoped>
	.login-form{
		width: 450px;
		margin: 150px auto; 
		border: 1px solid #e5e5e5;
		box-sizing: border-box;
		padding: 50px;
		border-radius: 5px;
	}
	.btn{
		width: 100%;
		margin: 20px auto 0;
	}
</style>