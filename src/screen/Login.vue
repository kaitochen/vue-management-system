<template>
	<section class="bg">
		<el-form class="login-form">
			<h3>后台管理系统</h3>
			<el-form-item >
				<el-input type="text" v-model="name"  auto-complete="off" placeholder="账号"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input type="password" v-model="password"  auto-complete="off" placeholder="密码"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" class="btn" @click.native.prevent="submit">登录</el-button>
			</el-form-item>
		</el-form>

	</section>
</template>
<script>
	import axios from 'axios';
	import API from '../util.js';
	export default {
		data(){
			return{
				name: '',
				password: '',
				test: '123'
			}
		},
		methods: {
			submit(){
				axios.post(API.login,{username: this.name ,password: this.password}).then((rsp)=>{
		          	let res = rsp.data;
		          	if(res.code === 200){
		          		sessionStorage.setItem('token',res.data.token);		
		          		this.$router.push({
							path: '/'
						})	
		          	}else{

		          	}
		        }).catch(function(error){
		            console.log(error)
		        })
				// console.log(this.$router);
				// if(this.name == 'admin' && this.password == 'admin'){
				// 	sessionStorage.setItem('lg', (new Date()).getTime());
				// 	sessionStorage.setItem('token','token12313131')
				// 	this.$router.push({
				// 		path: '/'
				// 	})
				// }
			}
		}
	}
</script>
<style scoped>
	.bg{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0px;
		bottom: 0px;
		background-color: #e4edec;
		background-image: url('../assets/bg2.jpg');
		background-size: auto 100%;
		background-repeat: no-repeat;
		/*background-position: 50%;*/
	}
	.login-form{
		width: 450px;
		position: absolute;
		top: 200px;
		right: 200px; 
		/*border: 1px solid #fff;*/
		box-sizing: border-box;
		padding: 50px;
		border-radius: 5px;
		background-color: rgba(255,255,255,0.7);
	}
	.btn{
		width: 100%;
		margin: 20px auto 0;
	}
</style>