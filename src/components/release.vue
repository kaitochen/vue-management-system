<template>
	<section v-loading="loading">
		<el-table  :data="dataArr"  max-height="100%"  style="width: 100%;border: 1px solid #e5e5e5;color:#333;margin-bottom: 20px;">
			<el-table-column type="index" sortable width="55" header-align="center" >
			</el-table-column>
			<el-table-column prop="name" label="学生姓名" min-width="100" header-align="center">
			</el-table-column>				
			<el-table-column prop="grade" label="学龄段" min-width="100" header-align="center">			
			</el-table-column>				
			<el-table-column prop="address" label="地址" min-width="200" header-align="center">
			</el-table-column>				
			<el-table-column prop="demand" label="要求" min-width="200" header-align="center">
			</el-table-column>			
	      	<el-table-column label="操作" width="250" header-align="center">
				<template slot-scope="scope">
				<el-button  size="small" @click="showItem(scope.$index, scope.row.id)">查看</el-button>
				<el-button type="primary" size="small" @click="sendItem(scope.$index, scope.row.id)">发布</el-button>
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
	    <el-dialog title="查看" width="900px" :visible.sync="dialogVisible">
	    	<section>
				<el-row class="item half">
					<el-col :span="6">
						<p class="title">学生姓名：</p>
					</el-col>
					<el-col class="input" :span="14">
						<el-input v-model="name" :disabled="true"></el-input>
					</el-col>
				</el-row>
				<el-row  class="item half">
					<el-col  :span="6">
						<p class="title">性别：</p>
					</el-col>
					<el-col class="input" :span="14">
						<el-input v-model="sex" :disabled="true"></el-input>
					</el-col>
				</el-row>				
				<el-row class="item half">
					<el-col  :span="6">
						<p class="title">学龄段：</p>
					</el-col>
					<el-col class="input" :span="14">
						<el-input v-model="grade" :disabled="true"></el-input>
					</el-col>
				</el-row>			
				<el-row class="item half">
					<el-col  :span="6">
						<p class="title">年级：</p>
					</el-col>
					<el-col class="input" :span="14">
						<el-input v-model="classify" :disabled="true"></el-input>
					</el-col>
				</el-row>				
				<el-row class="item half">
					<el-col  :span="6">
						<p class="title">学习性格：</p>
					</el-col>
					<el-col class="input" :span="14">
						<el-input v-model="trait" :disabled="true"></el-input>
					</el-col>
				</el-row>					
				<el-row class="item half">
					<el-col  :span="6">
						<p class="title">家长称呼：</p>
					</el-col>
					<el-col class="input" :span="14">
						<el-input v-model="patriarchName" :disabled="true"></el-input>
					</el-col>
				</el-row>				
				<el-row class="item half">
					<el-col  :span="6">
						<p class="title">薪酬：</p>
					</el-col>
					<el-col class="input" :span="14">
						<el-input v-model="emolument" :disabled="true"></el-input>
					</el-col>
				</el-row>				
				<el-row class="item half">
					<el-col  :span="6">
						<p class="title">联系方式：</p>
					</el-col>
					<el-col class="input" :span="14">
						<el-input v-model="phone" :disabled="true"></el-input>
					</el-col>
				</el-row>
				<el-row class="item">
					<el-col  :span="3">
						<p class="title">辅导科目：</p>
					</el-col>
					<el-col class="input" :span="19">
						<el-input v-model="subject" :disabled="true"></el-input>
					</el-col>
				</el-row>				
				<el-row class="item">
					<el-col  :span="3">
						<p class="title">辅导时间：</p>
					</el-col>
					<el-col class="input" :span="19">
						<el-input v-model="date" :disabled="true"></el-input>
					</el-col>
				</el-row>							
				<el-row class="item">
					<el-col  :span="3">
						<p class="title">学生基础：</p>
					</el-col>
					<el-col class="input" :span="19">
						<el-input v-model="studentBase" :disabled="true"></el-input>
					</el-col>
				</el-row>
				<el-row class="item">
					<el-col  :span="3">
						<p class="title">老师要求：</p>
					</el-col>
					<el-col class="input" :span="19">
						<el-input v-model="demand" :disabled="true"></el-input>
					</el-col>
				</el-row>				
				<el-row class="item">
					<el-col  :span="3">
						<p class="title">地址：</p>
					</el-col>
					<el-col class="input" :span="19">
						<el-input v-model="address" :disabled="true"></el-input>
					</el-col>
				</el-row>				
			</section>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</div>
		</el-dialog>	    
		<el-dialog title="发布信息" width="900px" :visible.sync="sendVisible">
	    	<section>
				<el-row class="item">
					<el-col  :span="3">
						<p class="title">标题：</p>
					</el-col>
					<el-col class="input" :span="19">
						<el-input v-model="title"></el-input>
					</el-col>
				</el-row>				
				<el-row class="item">
					<el-col  :span="3">
						<p class="title">学员：</p>
					</el-col>
					<el-col class="input" :span="19">
						<el-input v-model="student"></el-input>
					</el-col>
				</el-row>							
				<el-row class="item">
					<el-col  :span="3">
						<p class="title">时间：</p>
					</el-col>
					<el-col class="input" :span="19">
						<el-input v-model="time"></el-input>
					</el-col>
				</el-row>
				<el-row class="item">
					<el-col  :span="3">
						<p class="title">薪酬：</p>
					</el-col>
					<el-col class="input" :span="19">
						<el-input v-model="money"></el-input>
					</el-col>
				</el-row>				
				<el-row class="item">
					<el-col  :span="3">
						<p class="title">地址：</p>
					</el-col>
					<el-col class="input" :span="19">
						<el-input v-model="address"></el-input>
					</el-col>
				</el-row>					
				<el-row class="item">
					<el-col  :span="3">
						<p class="title">要求：</p>
					</el-col>
					<el-col class="input" :span="19">
						<el-input v-model="demand"></el-input>
					</el-col>
				</el-row>				
			</section>
			<div slot="footer" class="dialog-footer">
				<el-button  @click="sendVisible = false">关闭</el-button>
				<!-- <el-button type="danger" @click="sendVisible = false">下线</el-button> -->
				<el-button type="primary" @click="checkChange">发布</el-button>
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
				name: '',
				sex: '',
				grade: '',
				classify: '',
				trait: '',
				patriarchName: '',
				emolument: '',
				phone: '',
				subject: '',
				date: '',
				studentBase: '',
				demand: '',
				address: '',
				title: '',
				student: '',
				time: '',
				money: '',
				
				loading: true,

				pageIndex: 1,
				total: 0,

			}
		},
		methods: {
			// 初始化分页获取列表数据
			getData: function(){
				// console.log(api);
				axios.get(`${api}/admin/v1/patriarch-education-order/list?pageIndex=${this.pageIndex}&pageSize=20`).then((res)=>{
		          	console.log(res);
		          	let arr = [];
		          	let list = res.data.data.list;
		          	this.total = res.data.data.total;
		          	let len = list.length;
		          	list.map((arr)=>{
		          		let obj = {
		          					id: arr.id,
		          					name: arr.studentName,
		          					sex: this.sexChange(arr.sex),
		          					grade: this.gradeChange(arr.grade),
		          					classify: arr.classify,
		          					phone: arr.phone,
		          					trait: arr.trait,
		          					date: arr.date,
		          					subject: arr.subject,
		          					patriarchName: arr.patriarchName,
		          					emolument: arr.emolument,
		          					studentBase: arr.studentBase,
		          					demand: arr.demand,
		          					address: arr.address,
		          					createDate: arr.createDate
		          				}
		          		this.dataArr.push(obj);
		          		// console.log(arr)
		          	})
		          	this.loading = false;

		          // this.tableData3.push(arr);
		          // console.log(this.tableData3)
		        }).catch(function(error){
		            console.log(error)
		        })
			},
		    // 分页器点击跳转
		    pageChange: function(val){
		    	this.pageIndex = val;
		    	this.loading = true;
		    	axios.get(`${api}/admin/v1/patriarch-education-order/list?pageIndex=${this.pageIndex}&pageSize=20`).then((res)=>{
		          	// console.log(res);
		          	if(res.data.code == 200){
			    		this.dataArr = [];
			          	let arr = [];
			          	let list = res.data.data.list;
			          	this.total = res.data.data.total;
			          	let len = list.length;
			          	list.map((arr)=>{
			          		let obj = {
			          					id: arr.id,
			          					name: arr.studentName,
			          					sex: this.sexChange(arr.sex),
			          					grade: this.gradeChange(arr.grade),
			          					classify: arr.classify,
			          					phone: arr.phone,
			          					trait: arr.trait,
			          					date: arr.date,
			          					subject: arr.subject,
			          					patriarchName: arr.patriarchName,
			          					emolument: arr.emolument,
			          					studentBase: arr.studentBase,
			          					demand: arr.demand,
			          					address: arr.address,
			          					createDate: arr.createDate
			          				}
			          		this.dataArr.push(obj);
			          		// console.log(arr)
			          	})
			          	this.loading = false;
		          	}
		        }).catch(function(error){
		            console.log(error)
		        })
		    },
		    // 编辑表单，自动填入数据
		    showItem: function(index, id){
		    	this.dialogVisible = true;
		    	this.name = this.dataArr[index].name;
				this.sex = this.dataArr[index].sex;
				this.grade = this.dataArr[index].grade;
				this.classify = this.dataArr[index].classify;
				this.trait = this.dataArr[index].trait;
				this.patriarchName = this.dataArr[index].patriarchName;
				this.emolument = this.dataArr[index].emolument;
				this.phone = this.dataArr[index].phone;
				this.subject = this.dataArr[index].subject;
				this.date = this.dataArr[index].date;
				this.studentBase = this.dataArr[index].studentBase;
				this.demand = this.dataArr[index].demand;
				this.address = this.dataArr[index].address;
		    	// console.log(index);
		    	// console.log(id)
		    },
		    sendItem: function(index, id){
		    	this.sendVisible = true;
				this.time = this.dataArr[index].date;
				this.money = this.dataArr[index].emolument;
				this.demand = this.dataArr[index].demand;
				this.address = this.dataArr[index].address;
		    },
		    // 编辑表单，提交修改
		    checkChange: function(){
		    	axios.put(`${api}/admin/v1/education-order/`,{
		    		title: this.title,
		    		student: this.student,
		    		date: this.time,
		    		emolument: this.money,
		    		address: this.address,
		    		demand: this.demand
		    	}).then((res)=>{
		          	console.log(res);
		          	if(res.data.code == 200){
		          		this.sendVisible = false;
		          		this.$message({
				          message: '发布成功',
				          type: 'success',
				          center: true,
				          duration: 1000
				        });
		          	}
		        }).catch(function(error){
		            console.log(error)
		        })
		    },
		    // 点击删除，弹窗确认
		    openDelete: function(index,id){
		    	this.deleteVisible = true;
		    	this.id = this.dataArr[index].id;
		    	this.title = this.dataArr[index].title;
		    	this.student = this.dataArr[index].student;
		    	this.date = this.dataArr[index].date;
		    	this.emolument = this.dataArr[index].emolument;
		    	this.address = this.dataArr[index].address;
		    	this.demand = this.dataArr[index].demand;
		    	this.createDate = this.dataArr[index].createDate;
		    },
		    // 确认删除
		    deleteItem: function(){
		    	axios.delete(`${api}/admin/v1/patriarch-education-order/${this.id}`).then((res)=>{
		          	console.log(res);
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

		          // this.tableData3.push(arr);
		          // console.log(this.tableData3)
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
		    			return '小学';
		    		break;
		    		case 2:
		    			return '初中';
		    		break;
		    		case 3:
		    			return '高中';
		    		break;
		    		case 4:
		    			return '成教';
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