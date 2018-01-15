<template>
	<section :span="24">
		<el-row :span="20" :offset="2" class="item">
			<el-col :span="5">
				<p class="title">账号：</p>
			</el-col>
			<el-col class="input" :span="14">
				<el-input v-model="name" :disabled="nameState"></el-input>
			</el-col>
			<el-col class="btn" :span="5">
				<el-button type="danger" size="small" >删除</el-button>
			</el-col>
		</el-row>
		<el-row :span="20" :offset="2" class="item">
			<el-col  :span="5">
				<p class="title">密码：</p>
			</el-col>
			<el-col class="input" :span="14">
				<el-input v-model="password" :disabled="pawState"></el-input>
			</el-col>
			<el-col class="btn" :span="5">
				<el-button type="primary" size="small" v-on:click="setState">编辑</el-button>
			</el-col>
		</el-row>
		<el-row :span="20" :offset="2" class="item">
			<el-col  :span="5">
				<p class="title">角色：</p>
			</el-col>
			<el-col class="type" :span="14">
				<el-tag>管理员</el-tag>
				<el-tag>分析师</el-tag>
				<el-tag>客服</el-tag>
				<el-tag>超级管理员</el-tag>
				<el-tag>技术部</el-tag>				
			</el-col>
			<el-col class="btn" :span="5">
				<el-button type="primary" size="small">编辑</el-button>
			</el-col>
		</el-row>
		<el-row :span="20" :offset="2" class="item">
			<el-col  :span="5">
				<p class="title">权限：</p>
			</el-col>
			<el-col  class="type" :span="14">
				<el-tag>发布信息</el-tag>
				<el-tag>数据统计</el-tag>
				<el-tag>发布策略</el-tag>
				<el-tag>修改用户</el-tag>
				<el-tag>查看注册</el-tag>					
				<el-tag>发布信息</el-tag>
				<el-tag>数据统计</el-tag>
				<el-tag>发布策略</el-tag>
				<el-tag>修改用户</el-tag>
				<el-tag>查看注册</el-tag>					
				<el-tag>发布信息</el-tag>
				<el-tag>数据统计</el-tag>
				<el-tag>发布策略</el-tag>
				<el-tag>修改用户</el-tag>
				<el-tag>查看注册</el-tag>	
			</el-col>
			<el-col class="btn" :span="5">
				<el-button type="primary" size="small"  @click="dialogFormVisible = true">编辑</el-button>
			</el-col>
		</el-row>
		<el-dialog title="权限控制" width="800px" :visible.sync="dialogFormVisible">
			<el-transfer v-model="value1" :data="data"></el-transfer>	
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
			</div>
		</el-dialog>
	</section>
</template>
<script>
	export default{
		data(){
			const generateData = _ => {
	        const data = [];
	        for (let i = 1; i <= 15; i++) {
				data.push({
					key: i,
					label: `备选项 ${ i }`
				});
			}
				return data;
			};
			return{
				name: 'admin',
				password: 123456,
				nameState: true,
				pawState: true,
				dialogFormVisible: false,
				data: generateData(),
        		value1: []
			}
		},
		methods: {
			setState: function(){
				this.pawState = !this.pawState;
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
	}
</style>