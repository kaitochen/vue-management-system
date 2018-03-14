<template>
	<section v-loading="loading">
		<el-table  :data="dataArr"  max-height="100%"  style="width: 100%;border: 1px solid #e5e5e5;color:#333;margin-bottom: 20px;">
			<el-table-column type="index" sortable width="55" header-align="center" >
			</el-table-column>
<!-- 			<el-table-column prop="role" label="标题" min-width="200" header-align="center">
			</el-table-column> -->				
			<el-table-column prop="name" label="姓名" min-width="100" header-align="center">
			</el-table-column>				
			<el-table-column prop="phone" label="联系方式" min-width="150" header-align="center">
			</el-table-column>			
			<el-table-column prop="experience" label="家教经历" min-width="300" header-align="center">	
			</el-table-column>
	      	<el-table-column label="操作" width="180" header-align="center">
				<template slot-scope="scope">
				<el-button  size="small" @click="showResume(scope.$index, scope.row.id)">查看</el-button>
				<el-button type="danger" size="small" @click="openDelete(scope.$index, scope.row.id)">删除</el-button>
				</template>
	        </el-table-column>
	    </el-table>
	   	<el-pagination
	      background
	      layout="prev, pager, next"
	      @current-change="pageChange"
	      :page-size="20"
	      :total="total">
	    </el-pagination>
	    <el-dialog title="查看" top="50px" width="900px" :visible.sync="dialogVisible">
	    	<section>
	    		<el-row class="item">
					<el-col  :span="3">
						<p class="title">标题：</p>
					</el-col>
					<el-col class="input" :span="19">
						<el-input v-model="title"></el-input>
					</el-col>
				</el-row>	
				<el-row class="item half">
					<el-col :span="6">
						<p class="title">姓名：</p>
					</el-col>
					<el-col class="input" :span="14">
						<el-input v-model="name"></el-input>
					</el-col>
				</el-row>
				<el-row  class="item half">
					<el-col  :span="6">
						<p class="title">性别：</p>
					</el-col>
					<el-col class="input" :span="14">
						<el-input v-model="sex"></el-input>
					</el-col>
				</el-row>				
				<el-row class="item half">
					<el-col  :span="6">
						<p class="title">年级：</p>
					</el-col>
					<el-col class="input" :span="14">
						<el-input v-model="grade"></el-input>
					</el-col>
				</el-row>			
				<el-row class="item half">
					<el-col  :span="6">
						<p class="title">学校：</p>
					</el-col>
					<el-col class="input" :span="14">
						<el-input v-model="school"></el-input>
					</el-col>
				</el-row>				
				<el-row class="item half">
					<el-col  :span="6">
						<p class="title">专业：</p>
					</el-col>
					<el-col class="input" :span="14">
						<el-input v-model="major"></el-input>
					</el-col>
				</el-row>				
				<el-row class="item half">
					<el-col  :span="6">
						<p class="title">籍贯：</p>
					</el-col>
					<el-col class="input" :span="14">
						<el-input v-model="location"></el-input>
					</el-col>
				</el-row>				
				<el-row class="item half">
					<el-col  :span="6">
						<p class="title">联系方式：</p>
					</el-col>
					<el-col class="input" :span="14">
						<el-input v-model="phone"></el-input>
					</el-col>
				</el-row>				
				<el-row class="item half">
					<el-col  :span="6">
						<p class="title">微信号：</p>
					</el-col>
					<el-col class="input" :span="14">
						<el-input v-model="wechat"></el-input>
					</el-col>
				</el-row>
				<el-row class="item">
					<el-col  :span="3">
						<p class="title">证件：</p>
					</el-col>
					<el-col class="input" :span="19">
						<img style="float:left" width="320px" height="180px" :src="img">
					</el-col>
				</el-row>				
			
				<el-row class="item">
					<el-col  :span="3">
						<p class="title">相关成绩：</p>
					</el-col>
					<el-col class="input" :span="19">
						<el-input type="textarea" v-model="score"></el-input>
					</el-col>
				</el-row>							
				<el-row class="item">
					<el-col  :span="3">
						<p class="title">自我描述：</p>
					</el-col>
					<el-col class="input" :span="19">
						<el-input type="textarea" v-model="mine"></el-input>
					</el-col>
				</el-row>
				<el-row class="item">
					<el-col  :span="3">
						<p class="title">家教经历：</p>
					</el-col>
					<el-col class="input" :span="19">
						<el-input type="textarea" v-model="experience"></el-input>
					</el-col>
				</el-row>				
			</section>
			<div slot="footer" class="dialog-footer">
				<!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
				deleteVisible: false,
				id: 0,
				name: '',
				sex: '',
				grade: '',
				school: '',
				major: '',
				location: '',
				phone: '',
				wechat: '',
				img: '',
				score: '',
				mine: '',
				experience: '',
				title: '',

				loading: true,
				img: '',

				pageIndex: 1,
				total: 100,
			}
		},
		methods: {
			// 初始化分页获取列表数据
			getData: function(){
				// console.log(api);
				axios.get(`${api}/admin/v1/teacher-resume/list?pageIndex=${this.pageIndex}&pageSize=20`).then((res)=>{
		          	console.log(res);
		          	let arr = [];
		          	let list = res.data.data.list;
		          	this.total = res.data.data.total;
		          	let len = list.length;
		          	this.loading = false;
		          	console.log(list)
		          	list.map((arr)=>{
		          		let obj = {
		          					id: arr.id,
		          					title: arr.educationOrderTitle,
									name: arr.username,
									sex: this.sexChange(arr.sex),
									grade: this.gradeChange(arr.grade),
									school: arr.school,
									major: arr.specialty,
									location: arr.nativePlace,
									phone: arr.phone,
									wechat: arr.weixin,
									img: arr.file == undefined ?'':arr.file.link,
									score: arr.performance,
									mine: arr.description,
									experience: arr.experience == 0 ?'无':arr.experienceDescription
		          				}
		          		this.dataArr.push(obj);
		          		// console.log(arr)
		          	})
		        }).catch(function(error){
		            console.log(error)
		        })
			},
		    // 分页器点击跳转
		    pageChange: function(val){
		    	this.pageIndex = val;
		    	this.loading = true;
		    	axios.get(`${api}/admin/v1/teacher-resume/list?pageIndex=${this.pageIndex}&pageSize=20`).then((res)=>{
		          	console.log(res);
		          	let arr = [];
		          	this.dataArr = [];
		          	let list = res.data.data.list;
		          	this.total = res.data.data.total;
		          	let len = list.length;
		          	list.map((arr)=>{
		          		let obj = {
		          					id: arr.id,
		          					title: arr.educationOrderTitle,
									name: arr.username,
									sex: this.sexChange(arr.sex),
									grade: this.gradeChange(arr.grade),
									school: arr.school,
									major: arr.specialty,
									location: arr.nativePlace,
									phone: arr.phone,
									wechat: arr.weixin,
									img: 'arr.file.link',
									score: arr.performance,
									mine: arr.description,
									experience: arr.experience == 0 ?'无':arr.experienceDescription
		          				}
		          		this.dataArr.push(obj);
		          	})
		          	this.loading = false;
		        }).catch(function(error){
		            console.log(error)
		        })
		    },
		    showResume:  function(index, id){
		    	this.dialogVisible = true;
		    	this.id = this.dataArr[index].id;
				this.name = this.dataArr[index].name;
				this.sex = this.dataArr[index].sex;
				this.grade = this.dataArr[index].grade;
				this.school = this.dataArr[index].school;
				this.major = this.dataArr[index].major;
				this.location = this.dataArr[index].location;
				this.phone = this.dataArr[index].phone;
				this.wechat = this.dataArr[index].wechat;
				this.img = this.dataArr[index].img;
				this.score = this.dataArr[index].score;
				this.mine = this.dataArr[index].mine;
				this.experience = this.dataArr[index].experience;
				this.title = this.dataArr[index].title;
		    },
		    // 点击删除，弹窗确认
		    openDelete: function(index,id){
		    	this.deleteVisible = true;
		    	this.id = this.dataArr[index].id;
		    },
		    // 确认删除
		    deleteItem: function(){
		    	axios.delete(`${api}/admin/v1/teacher-resume/${this.id}`).then((res)=>{
		          	console.log(res);
		          	this.deleteVisible = false;
		          	if(res.data.code == 200){
		    			this.deleteVisible = false;
		          		this.$message({
				          message: '删除成功',
				          type: 'success',
				          center: true,
				          duration: 1000
				        });
				        this.loading = true;
		          		this.dataArr = [];
				        this.getData();
		          	}
		        }).catch(function(error){
		            console.log(error)
		        })
		    },
		    sexChange: function(val){
		    	switch(val){
		    		case 1:
		    			return '男';
		    		break;
		    		case 2:
		    			return '女';
		    		break;
		    	}
		    },
		    gradeChange: function(val){
		    	switch(val){
		    		case 1:
		    			return '大一';
		    		break;
		    		case 2:
		    			return '大二';
		    		break;
		    		case 3:
		    			return '大三';
		    		break;
		    		case 4:
		    			return '大四';
		    		break;
		    		case 5:
		    			return '研究生';
		    		break;
		    	}
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