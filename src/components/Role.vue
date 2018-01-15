<template>
	<section>
		<el-col :span="24" style="text-align: left;padding: 10px;background-color: #e5e5e5">
			<el-input style="width: 250px" size="small"></el-input>
			<el-select v-model="select" size="small"style="width: 120px;float: left" placeholder="请选择">
			    <el-option
			      v-for="item in options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value"
			    >
			    </el-option>
			</el-select>
			<el-button type="primary" size="small" style="height: 30px;">查询</el-button>
			<el-button type="primary" size="small" style="height: 30px;" @click="linkTo">增加角色</el-button>
		</el-col>
		<el-table
	      :data="user"
	      max-height="100%"
	      style="width: 100%;border: 1px solid #e5e5e5;color:#333;margin-bottom: 20px;"
	      >
			<el-table-column type="index" sortable width="55" header-align="center" >
			</el-table-column>
			<el-table-column prop="name"  label="角色名称" width="180" header-align="center">
			</el-table-column>			
			<el-table-column prop="auth" label="权限" min-width="300" header-align="center">
				<template slot-scope="scope">
					<template  v-for="item in scope.row.role">
            			<el-tag color="#019bbe" style="margin: 5px 5px 0 0;color: #fff">{{ item.name }}</el-tag>
					</template>
      			</template>
			</el-table-column>
			<el-table-column prop="description"  label="描述" width="250" header-align="center">
			</el-table-column>
	      	<el-table-column label="操作" width="200" header-align="center">
				<template slot-scope="scope">
				<el-button type="primary" size="small"  @click="handleEdit(scope.$index, scope.row.id)">编辑</el-button>
				<el-button type="danger" size="small" @click="deleteVisible = true">删除</el-button>
				</template>
	        </el-table-column>
	    </el-table>
	    <el-dialog title="编辑" width="600px" :visible.sync="dialogVisible">
	    	<section :span="24">
				<el-row :span="20" :offset="2" class="item">
					<el-col :span="5">
						<p class="title">角色名称：</p>
					</el-col>
					<el-col class="input" :span="14">
						<el-input v-model="name"></el-input>
					</el-col>
				</el-row>
				<el-row :span="20" :offset="2" class="item">
					<el-col  :span="5">
						<p class="title">角色描述：</p>
					</el-col>
					<el-col class="input" :span="14">
						<el-input v-model="description"></el-input>
					</el-col>
				</el-row>
				<el-row :span="20" :offset="2" class="item">
					<el-col  :span="5">
						<p class="title">权限分配：</p>
					</el-col>
					<el-col class="type" :span="14">
						<template v-for="item in dialogRole">
							<el-tag color="#019bbe" style="margin-right: 5px;color: #fff">{{item.name}}</el-tag>
						</template>			
					</el-col>
					<el-col class="btn" :span="5">
						<el-button type="primary" size="small" @click="roleVisible=!roleVisible">编辑</el-button>
					</el-col>
				</el-row>
				<el-transfer v-model="RoleIndex" :data="role"  v-show="roleVisible"></el-transfer>
			</section>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="setAuth">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog
		  title="删除"
		  :visible.sync="deleteVisible"
		  width="300px"
		  center>
		  <span style="display: block;text-align:center">确认删除这一项？</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="deleteVisible = false">取 消</el-button>
		    <el-button type="danger" @click="deleteVisible = false">确 定</el-button>
		  </span>
		</el-dialog>
	</section>
</template>
<script>
	import axios from 'axios';
	export default{
		data(){ 
			return {
				user: [
					{id: 1, description: '这是超级管理员', name: '超级管理员', role: [
						{key:1,name:'发布信息1'},
        				{key:2,name:'数据统计2'},
        				{key:3,name:'发布策略3'},
        				{key:4,name:'修改用户4'},
        				{key:5,name:'查看注册5'},
        				{key:6,name:'发布信息6'},
        				{key:7,name:'数据统计7'}
        			]},
					{id: 2, description: '这是管理员', name: '管理员', role: [
						{key:9,name:'修改用户9'},
        				{key:10,name:'查看注册10'},
        				{key:11,name:'发布信息11'},
        				{key:12,name:'数据统计12'}
					]},
					{id: 3, description: '这是客服', name: '客服', role: [
						{key:5,name:'查看注册5'},
        				{key:6,name:'发布信息6'},
        				{key:7,name:'数据统计7'},
        				{key:8,name:'发布策略8'},
        				{key:9,name:'修改用户9'}
        			]},
					{id: 4, description: '这是分析师', name: '分析师', role: [
						{key:2,name:'数据统计2'},
        				{key:3,name:'发布策略3'}
					]},
					{id: 5, description: '这是技术部', name: '技术部', role: [
						{key:1,name:'发布信息1'},
        				{key:2,name:'数据统计2'},
        				{key:3,name:'发布策略3'},
        				{key:4,name:'修改用户4'},
        				{key:5,name:'查看注册5'}
					]},
				],
				dialogVisible: false,
				deleteVisible: false,
				name: '',
				description: '',
				index: -1,
				dialogRole: [],
				roleVisible: false,
        		RoleIndex: [],
				role: [
        				{key:1,label:'发布信息1'},
        				{key:2,label:'数据统计2'},
        				{key:3,label:'发布策略3'},
        				{key:4,label:'修改用户4'},
        				{key:5,label:'查看注册5'},
        				{key:6,label:'发布信息6'},
        				{key:7,label:'数据统计7'},
        				{key:8,label:'发布策略8'},
        				{key:9,label:'修改用户9'},
        				{key:10,label:'查看注册10'},
        				{key:11,label:'发布信息11'},
        				{key:12,label:'数据统计12'},
        				{key:13,label:'发布策略13'},
        				{key:14,label:'修改用户14'},
        				{key:15,label:'查看注册15'}
					],
        		checkRole: [],
				options: [{
		          value: 'name',
		          label: '名称'
		        }, {
		          value: 'auth',
		          label: '权限'
		        }, {
		          value: 'description',
		          label: '描述'
		        }],
		        select: ''
			}
		},
		methods: {
			getUser: function(){

			},
			handleEdit(index, id) {
				this.dialogVisible = true;
				this.RoleIndex = [];
				this.index = index;
		    	this.name = this.user[index].name;
		    	this.description = this.user[index].description;
		    	this.dialogRole = this.user[index].role;
		    	this.user[index].role.map((i)=>{
		    		this.RoleIndex.push(i.key)
		    	})
		    },
		    linkTo: function(){
		    	this.$router.push({ path: '/newRole'})
		    },
		    setAuth: function(){
		    	let arr = [];
		    	this.RoleIndex.map((i)=>{
		    		// console.log(this.role[i-1]);
		    		arr.push({key:this.role[i-1].key,name: this.role[i-1].label});
		    	})
		    	this.user[this.index].role = arr;
		    	this.roleVisible = false;
		    	this.dialogVisible = false;
		    }

		},
		mounted(){
			this.getUser();
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