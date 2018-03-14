<template>
	<section>
		<el-row style="margin-bottom: 20px;">
			<el-col :span="2">
				<el-button size="small" @click="goBack">返回</el-button>
			</el-col>
		</el-row>
		<el-row class="item">
			<el-col  :span="7">
				<p class="title">账号：</p>
			</el-col>
			<el-col class="input" :span="10">
				<el-input v-model="username"></el-input>
			</el-col>
		</el-row>
		<el-row class="item">
			<el-col  :span="7">
				<p class="title">用户名：</p>
			</el-col>
			<el-col class="input" :span="10">
				<el-input v-model="nickname"></el-input>
			</el-col>
		</el-row>

		<el-row class="item">
			<el-col  :span="7">
				<p class="title">角色：</p>
			</el-col>
			<el-col class="input" :span="10">
				<el-select v-model="roles" style="width: 100%" multiple placeholder="请选择">
				    <el-option
				      v-for="item in roleList"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				</el-select>
			</el-col>
		</el-row>	
		<el-row class="item">
			<el-col  :span="7">
				<p class="title">密码：</p>
			</el-col>
			<el-col class="input" :span="10">
				<el-input v-model="password"></el-input>
			</el-col>
		</el-row>
		<el-col :span="4" :offset="10">
			<el-button type="primary" style="width: 100%;margin-top: 50px;" @click="submit">提交</el-button>
		</el-col>
	</section>
</template>
<script>
	import axios from 'axios';
	import {User_API,Function_API} from '../util.js';
	// import "../upload.js";
	export default{
		data(){
			return{
				username: '',
				nickname: '',
				roles: [],
				password: '',
				show: false,
				token: sessionStorage.getItem('token'),
				roleList: [],
			}
		},
		methods: {
			submit(){
				// console.log(User_API.add_user);/
				axios({
					url: User_API.add_user,
					method: 'put',
					headers: {
						'Authorization': 'Bearer '+sessionStorage.getItem('token'),
					},
					data:{
						nickname: this.nickname,
						username: this.username,
						password: this.password,
						roles: this.roles.join(','),
					}
				}).then((rsp)=>{
					let res = rsp.data;
					console.log(res);
					if(res.code === 200){
						this.$message({
							message: '添加用户成功',
							type: 'success',
							duration: 1000
						});
						this.$router.back();
					}else{
						this.$message({
							message: '添加用户失败',
							type: 'success',
							duration: 1000
						});
					}	
					
				}).catch((err)=>{
					console.log(err);
				})
				
			},
			goBack: function(){
				this.$router.back()
			},
			getRoleList: function(){
				axios({
					url: Function_API.roles,
					method: 'get',
					headers: {
						'Authorization': 'Bearer '+sessionStorage.getItem('token'),
					}
				}).then((rsp)=>{
					let res = rsp.data;
					console.log(res);	
					res.data.map((item)=>{
						this.roleList.push({label: item,value: item});
					})
				}).catch((err)=>{
					console.log(err);
				})
			},
			getRole(i){
				console.log(i);
			}
			
		},
		mounted(){
			this.getRoleList();
		}
	}
</script>
<style scoped>
	.item{
		margin-bottom: 10px;
	}
	.title{
		text-align: right;
		height: 50px;
		line-height: 50px;
		margin: 0;
	}
	.input{
		line-height: 50px;
		padding-left: 10px;
	}
	.file_btn{
		display: block;
		text-decoration: none;
		color: #fff
	}
</style>