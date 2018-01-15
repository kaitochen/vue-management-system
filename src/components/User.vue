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
			<el-button type="primary" size="small" style="height: 30px;" @click="linkTo">增加用户</el-button>
		</el-col>
		<el-table
	      :data="user"

	      max-height="100%"
	      style="width: 100%;border: 1px solid #e5e5e5;color:#333;margin-bottom: 20px;"
	      >
			<el-table-column type="index" sortable width="55" header-align="center" >
			</el-table-column>
			<el-table-column prop="name"  label="账号" width="180" header-align="center">
			</el-table-column>
			<el-table-column prop="role" label="角色" min-width="300" header-align="center">
				<template slot-scope="scope">
					<template  v-for="item in scope.row.role">
            			<el-tag color="#019bbe" style="margin-right: 5px;color: #fff">{{ item }}</el-tag>
					</template>
      			</template>
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
						<p class="title">账号：</p>
					</el-col>
					<el-col class="input" :span="14">
						<el-input v-model="name" :disabled="true"></el-input>
					</el-col>
				</el-row>
				<el-row :span="20" :offset="2" class="item">
					<el-col  :span="5">
						<p class="title">密码：</p>
					</el-col>
					<el-col class="input" :span="14">
						<el-input v-model="password"></el-input>
					</el-col>
				</el-row>
				<el-row :span="20" :offset="2" class="item">
					<el-col  :span="5">
						<p class="title">角色：</p>
					</el-col>
					<el-col class="type" :span="14">
						<template v-for="item in dialogRole">
							<el-tag color="#019bbe" style="margin-right: 5px;color:#fff">{{item}}</el-tag>
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
				<el-button type="primary" @click="setRole">确 定</el-button>
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
					{id: 1, paw: '123456', name: 'admin1', role: ['超级管理员']},
					{id: 2, paw: '123456', name: 'admin2', role: ['管理员','客服']},
					{id: 3, paw: '123456', name: 'admin3', role: ['管理员','分析师']},
					{id: 4, paw: '123456', name: 'admin4', role: ['管理员','客服']},
					{id: 5, paw: '123456', name: 'admin5', role: ['管理员','客服']},
					{id: 6, paw: '123456', name: 'admin6', role: ['管理员','客服']},
					{id: 7, paw: '123456', name: 'admin7', role: ['管理员','分析师']},
					{id: 8, paw: '123456', name: 'admin8', role: ['管理员','分析师']},
					{id: 9, paw: '123456', name: 'admin9', role: ['技术部']},
					{id: 10, paw: '123456', name: 'admin10', role: ['技术部']},
					{id: 11, paw: '123456', name: 'admin11', role: ['技术部']},
					{id: 12, paw: '123456', name: 'admin12', role: ['技术部']},
					{id: 13, paw: '123456', name: 'admin13', role: ['技术部']},
					{id: 14, paw: '123456', name: 'admin14', role: ['技术部']},
					{id: 15, paw: '123456', name: 'admin15', role: ['技术部']},
					{id: 16, paw: '123456', name: 'admin16', role: ['技术部']},
					{id: 17, paw: '123456', name: 'admin17', role: ['技术部']},
					{id: 18, paw: '123456', name: 'admin18', role: ['技术部']},
				],
				dialogVisible: false,
				deleteVisible: false,
				name: '',
				password: '',
				dialogRole: [],
				index: -1,
				roleVisible: false,
        		RoleIndex: [],
				role: [
        				{key:1,label:'管理员'},
        				{key:2,label:'超级管理员',disabled:true},
        				{key:3,label:'客服'},
        				{key:4,label:'分析师'},
        				{key:5,label:'技术部'}
					],
				roleArr: ['管理员','超级管理员','客服','分析师','技术部'],
        		checkRole: [],
				options: [{
		          value: 'name',
		          label: '名称'
		        }, {
		          value: 'role',
		          label: '角色'
		        }],
		        select: ''
			}
		},
		methods: {
			getUser: function(){

			},
			handleEdit(index, id) {
				this.dialogVisible = true;
		    	this.name = this.user[index].name;
		    	this.password = this.user[index].paw;
		    	this.dialogRole = this.user[index].role;
		    	this.index = index;
		    	this.RoleIndex = [];
		    	this.user[index].role.map((i)=>{
		    		let num = this.roleArr.indexOf(i);
		    		if(num>-1){
		    			this.RoleIndex.push(num+1);
		    		}
		    		// console.log(this.RoleIndex)
		    	})
		    },
		    linkTo: function(){
		    	this.$router.push({ path: '/newUser'})
		    },
		    setRole: function(){
		    	let arr = [];
		    	if(this.RoleIndex.length>0){
		    		this.RoleIndex.map((i,index)=>{
		    			arr.push(this.roleArr[i-1]);
		    		})
		    	}
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