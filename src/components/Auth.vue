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
			<el-button type="primary" size="small" style="height: 30px;" @click="linkTo">增加权限</el-button>
		</el-col>
		<el-table
	      :data="user"
	      max-height="100%"
	      style="width: 100%;border: 1px solid #e5e5e5;color:#333;margin-bottom: 20px;"
	      >
			<el-table-column type="index" sortable width="55" header-align="center" >
			</el-table-column>
			<el-table-column prop="name"  label="名称" width="180" header-align="center">
			</el-table-column>
			<el-table-column prop="description"  label="描述" min-width="300" header-align="center">
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
						<p class="title">权限名称：</p>
					</el-col>
					<el-col class="input" :span="14">
						<el-input v-model="name"></el-input>
					</el-col>
				</el-row>
				<el-row :span="20" :offset="2" class="item">
					<el-col  :span="5">
						<p class="title">权限描述：</p>
					</el-col>
					<el-col class="input" :span="14">
						<el-input v-model="description"></el-input>
					</el-col>
				</el-row>
			</section>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
					{id: 1, description: '123456', name: 'admin1'},
					{id: 2, description: '123456', name: 'admin2'},
					{id: 3, description: '123456', name: 'admin3'},
					{id: 4, description: '123456', name: 'admin4'},
					{id: 5, description: '123456', name: 'admin5'},
					{id: 6, description: '123456', name: 'admin6'},
					{id: 7, description: '123456', name: 'admin7'},
					{id: 8, description: '123456', name: 'admin8'},
					{id: 9, description: '123456', name: 'admin9'},
					{id: 10, description: '123456', name: 'admin10'},
					{id: 11, description: '123456', name: 'admin11'},
					{id: 12, description: '123456', name: 'admin12'},
					{id: 13, description: '123456', name: 'admin13'},
					{id: 14, description: '123456', name: 'admin14'},
					{id: 15, description: '123456', name: 'admin15'},
					{id: 16, description: '123456', name: 'admin16'},
					{id: 17, description: '123456', name: 'admin17'},
					{id: 18, description: '123456', name: 'admin18'},
				],
				dialogVisible: false,
				deleteVisible: false,
				name: '',
				description: '',
				options: [{
		          value: 'name',
		          label: '名称'
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
		    	this.name = this.user[index].name;
		    	this.description = this.user[index].description;
		    },
		    linkTo: function(){
		    	this.$router.push({ path: '/newAuth'})
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