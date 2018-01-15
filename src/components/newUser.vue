<template>
	<section :span="24">
		<el-row :span="20" :offset="2" class="item">
			<el-col :span="5" :offset="2">
				<p class="title">账号：</p>
			</el-col>
			<el-col class="input" :span="10">
				<el-input v-model="name"></el-input>
			</el-col>
		</el-row>
		<el-row :span="20" :offset="2" class="item">
			<el-col  :span="5" :offset="2">
				<p class="title">密码：</p>
			</el-col>
			<el-col class="input" :span="10">
				<el-input v-model="password"></el-input>
			</el-col>
		</el-row>
		<el-row :span="20" :offset="2" class="item">
			<el-col  :span="5" :offset="2">
				<p class="title">角色：</p>
			</el-col>
			<el-col class="type" :span="10">
				<template v-for="item in checkRole">
					<el-tag style="margin-right: 5px">{{item}}</el-tag>
				</template>			
			</el-col>
			<el-col class="btn" :span="5">
				<el-button type="primary" size="small" @click="checkRoleState = true">编辑</el-button>
			</el-col>
		</el-row>
		<el-col :span="6" :offset="9">
			<el-button type="primary" size="medium" style="width:100%;margin-top: 50px">提交</el-button>
		</el-col>
		<el-dialog title="角色分配" width="800px" :visible.sync="checkRoleState">
			<el-transfer v-model="RoleIndex" :data="role"></el-transfer>	
			<div slot="footer" class="dialog-footer">
				<el-button @click="checkRoleState = false">取 消</el-button>
				<el-button type="primary" @click="setRole">确 定</el-button>
			</div>
		</el-dialog>
	</section>
</template>
<script>
	export default{
		data(){
			return{
				name: '',
				password: '',
				checkRoleState: false,
        		RoleIndex: [],
        		role: [
        				{key:1,label:'管理员'},
        				{key:2,label:'超级管理员',disabled:true},
        				{key:3,label:'客服'},
        				{key:4,label:'分析师'},
        				{key:5,label:'技术部'},
					],
        		checkRole: [],
			}
		},
		methods: {
			setState: function(){
				this.pawState = !this.pawState;
			},
			setRole: function(){
				console.log(this.RoleIndex);
				this.checkRole = [];
				this.checkRoleState=false;
				this.RoleIndex.map((i,index)=>{
					this.checkRole.push(this.role[i-1].label);
				})
			}
		}
	}
</script>
<style scoped>
	.item{
		margin-bottom: 10px;
		/*background-color: #999;*/
		/*border-bottom: 1px solid #e5e5e5;*/
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
	.type{
		text-align: left; 
		/*text-indent: 10px;*/
		/*height: 50px;*/
		line-height: 50px;
		padding-left: 10px;
	}
	.content{
		text-align: left; 
		text-indent: 10px;
		height: 50px;
		line-height: 50px;
		margin: 0;
	}
	.btn{
		height: 50px;
		line-height: 50px;
		text-align: left;
		margin-left: 10px;
	}
</style>