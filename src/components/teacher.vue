<template>
	<section v-loading="loading">
		<el-col :span="24" style="text-align: left;padding: 10px;background-color: #e5e5e5">
			<el-button type="primary" size="small" style="height: 30px;" @click="goNew">新增</el-button>
		</el-col>
		<el-table  :data="dataArr"  max-height="100%"  style="width: 100%;border: 1px solid #e5e5e5;color:#333;margin-bottom: 20px;">
			<el-table-column type="index" sortable width="55" header-align="center" >
			</el-table-column>
			<el-table-column prop="name" label="名字" min-width="100" header-align="center">
			</el-table-column>				
			<el-table-column prop="school" label="学校" min-width="100" header-align="center">
			</el-table-column>				
<!-- 			<el-table-column prop="img" label="头像" min-width="100" header-align="center">
			</el-table-column>	 -->			
			<el-table-column prop="experience" label="自我简介" min-width="200" header-align="center">
			</el-table-column>				
			<el-table-column prop="achievement" label="教学成果" min-width="200" header-align="center">
			</el-table-column>			
	      	<el-table-column label="操作" width="180" header-align="center">
				<template slot-scope="scope">
				<el-button type="primary" size="small" @click="changeData(scope.$index, scope.row.id)">编辑</el-button>
				<el-button type="danger" size="small" @click="openDelete(scope.$index, scope.row.id)">删除</el-button>
				</template>
	        </el-table-column>
	    </el-table>   
	    <el-dialog title="编辑" width="900px" :visible.sync="dialogVisible">
	    	<section>
				<el-row class="item">
					<el-col :span="3">
						<p class="title">姓名：</p>
					</el-col>
					<el-col class="input" :span="19">
						<el-input v-model="name"></el-input>
					</el-col>
				</el-row>
				<el-row  class="item">
					<el-col  :span="3">
						<p class="title">学校：</p>
					</el-col>
					<el-col class="input" :span="19">
						<el-input v-model="school"></el-input>
					</el-col>
				</el-row>	
				<el-row  class="item">
					<el-col  :span="3">
						<p class="title">头像：</p>
					</el-col>
					<el-col class="input" :span="19">
						<img width="100%" :src="imgId">
						
						<!-- <span>{{imgId}}</span> -->
					</el-col>
				</el-row>			
				<el-row class="item">
					<el-col  :span="3">
						<p class="title">自我简介：</p>
					</el-col>
					<el-col class="input" :span="19">
						<el-input type="textarea"  v-model="experience" ></el-input>
					</el-col>
				</el-row>				
				<el-row class="item">
					<el-col  :span="3">
						<p class="title">教学成果：</p>
					</el-col>
					<el-col class="input" :span="19">
						<el-input  type="textarea" v-model="achievement" ></el-input>
					</el-col>
				</el-row>									
			</section>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="checkChange">确 定</el-button>
			</div>
		</el-dialog>	
		<el-dialog  title="删除"  :visible.sync="deleteVisible"  width="300px"  center>
		  <span style="display: block;text-align:center">确认删除这一项？</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="deleteVisible = false">取 消</el-button>
		    <el-button type="danger" @click="deleteItem">确 定</el-button>
		  </span>
		</el-dialog>
	</section>
</template>
<script>
	import axios from 'axios';
	import api from '../api.js';
	export default{
		data(){ 
			return {
				dataArr: [],
				dialogVisible: false,
				sendVisible: false,
				deleteVisible: false,
				id: 0,
				name: '',
				school: '',
				imgId: '#',
				experience: '',
				achievement: '',
				pageIndex: 1,
				loading: true
			}
		},
		methods: {
			// 初始化分页获取列表数据
			getData: function(){
				// console.log(api);
				axios.get(`${api}/admin/v1/teacher-show/list?pageIndex=${this.pageIndex}&pageSize=20`).then((res)=>{
		          	let list = res.data.data.list;
					// console.log(list);
		          	list.map((i)=>{
		          		var id = i.imgId;
		          		// console.log(id.toLowerCase().match(/(jpg|jpeg|png)/) !== null && )
		          		// var img = (i.file !== undefined) ? i.file.link:'';
		          		// // console.log(img);
		          		let obj = {
		          			achievement: i.achievement,
					        experience: i.experience,
					        id: i.id,
					        imgId: (i.file == undefined) ? '' : i.file.link,
					        name: i.name,
					        school: i.school
					    }
					    this.dataArr.push(obj);
		          	})
		          	this.loading = false;
		          // this.tableData3.push(arr);
		          // console.log(this.tableData3)
		        }).catch(function(error){
		            console.log(error)
		        })
			},
		    // 编辑表单，自动填入数据
		    changeData: function(index, id){
		    	this.dialogVisible = true;
		    	this.id = this.dataArr[index].id;
		    	// console.log(this.id);
		    	this.name = this.dataArr[index].name;
		    	this.school = this.dataArr[index].school;
		    	this.imgId = this.dataArr[index].imgId;
		    	this.experience = this.dataArr[index].experience;
		    	this.achievement = this.dataArr[index].achievement;
		    	// console.log(index);
		    	// console.log(id)
		    },
		    // 编辑表单，提交修改
		    checkChange: function(){
		    	axios.post(`${api}/admin/v1/teacher-show/${this.id}`,{
		    		imgId: this.imgId,
		    		name: this.name,
		    		school: this.school,
		    		experience: this.experience,
		    		achievement: this.achievement,
		    	}).then((res)=>{
		          	console.log(res);
		          	if(res.data.code == 200){
		          		this.dialogVisible = false;
		          		this.loading = true;
		          		this.dataArr = [];
		          		this.getData();
		          	}
		          // this.tableData3.push(arr);
		          // console.log(this.tableData3)
		        }).catch(function(error){
		            console.log(error)
		        })
		    },
		    // 点击删除，弹窗确认
		    openDelete: function(index,id){
		    	this.deleteVisible = true;
		    	this.id = this.dataArr[index].id;
		    },
		    // 确认删除
		    deleteItem: function(){
		    	axios.delete(`${api}/admin/v1/teacher-show/${this.id}`).then((res)=>{
		          	console.log(res);
		          	if(res.data.code == 200){
		          		this.dataArr = [];
		    			this.deleteVisible = false;
		          		this.$message({
				          message: '删除成功',
				          type: 'success',
				          center: true,
				          duration: 1000
				        });
				        this.loading = true;
				        this.getData();
		          	}
		          // this.tableData3.push(arr);
		          // console.log(this.tableData3)
		        }).catch(function(error){
		            console.log(error)
		        })
		    },
		    goNew: function(){
		    	this.$router.push({path: 'newTeacher'})
		    }

		},
		// 生命周期钩子，挂载结束
		mounted(){
			this.getData();
		}
	}
</script>
<style scoped>
	.item{
		margin-bottom: 10px;

		/*background-color: #999;*/
		/*border-bottom: 1px solid #e5e5e5;*/
	}
	.half{
		width: 50%;
		float: left;
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