<template>
	<section v-loading="loading">
		<el-table  :data="dataArr"  max-height="100%"  style="width: 100%;border: 1px solid #e5e5e5;color:#333;margin-bottom: 20px;">
			<el-table-column type="index" sortable width="55" header-align="center" >
			</el-table-column>
			<el-table-column prop="title" label="标题" min-width="150" header-align="center">
			</el-table-column>				
			<el-table-column prop="student" label="学员" min-width="150" header-align="center">
			</el-table-column>				
			<el-table-column prop="date" label="时间" min-width="150" header-align="center">
			</el-table-column>				
			<el-table-column prop="emolument" label="薪酬" min-width="100" header-align="center">
			</el-table-column>			
			<el-table-column prop="address" label="地址" min-width="200" header-align="center">
			</el-table-column>			
			<el-table-column prop="demand" label="要求" min-width="200" header-align="center">
			</el-table-column>			
<!-- 			<el-table-column prop="name" label="已发布" width="100" header-align="center" sortable>	
			</el-table-column> -->
	      	<el-table-column label="操作" width="180" header-align="center">
				<template slot-scope="scope">
				<!-- <el-button  size="small" @click="dialogVisible = true">查看</el-button> -->
				<el-button type="primary" size="small" @click="changeData(scope.$index, scope.row.id)">编辑</el-button>
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
		<el-dialog title="编辑信息" width="900px" :visible.sync="dialogVisible">
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
						<el-input v-model="date"></el-input>
					</el-col>
				</el-row>
				<el-row class="item">
					<el-col  :span="3">
						<p class="title">薪酬：</p>
					</el-col>
					<el-col class="input" :span="19">
						<el-input v-model="emolument"></el-input>
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
				<el-button  @click="dialogVisible = false">关闭</el-button>
				<!-- <el-button type="danger" @click="dialogVisible = false">下线</el-button> -->
				<el-button type="primary" @click="checkChange">确定</el-button>
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
				loading: true,

				id: 0,
				title: '',
				student: '',
				date: '',
				emolument: '',
				address: '',
				demand: '',
				index: -1,

				pageIndex: 1,
				total: 0
			}
		},
		methods: {
			// 初始化分页获取列表数据
			getData: function(){
				// console.log(api);
				axios.get(`${api}/admin/v1/education-order/list?pageIndex=${this.pageIndex}&pageSize=20`).then((res)=>{
		          	console.log(res);
		          	let arr = [];
		          	let list = res.data.data.list;
		          	this.total = res.data.data.total;
		          	let len = list.length;
		          	list.map((arr)=>{
		          		let obj = {
		          					id: arr.id,
		          					title: arr.title,
		          					student: arr.student,
		          					date: arr.date,
		          					emolument: arr.emolument,
		          					address: arr.address,
		          					demand: arr.demand,
		          					createDate: arr.createDate
		          				}
		          		this.dataArr.push(obj);
		          		// console.log(arr)
		          	})
		          	this.loading = false;
		          // this.tableData3.push(arr);
		          // console.log(this.dataArr)
		        }).catch(function(error){
		            console.log(error)
		        })
			},
		    // 分页器点击跳转
		    pageChange: function(val){
		    	this.pageIndex = val;
		    	this.dataArr = [];
		    	axios.get(`${api}/admin/v1/education-order/list?pageIndex=${this.pageIndex}&pageSize=20`).then((res)=>{
		          	console.log(res);
		          	let arr = [];
		          	let list = res.data.data.list;
		          	this.total = res.data.data.total;
		          	let len = list.length;
		          	list.map((arr)=>{
		          		let obj = {
		          					id: arr.id,
		          					title: arr.title,
		          					student: arr.student,
		          					date: arr.date,
		          					emolument: arr.emolument,
		          					address: arr.address,
		          					demand: arr.demand,
		          					createDate: arr.createDate
		          				}
		          		this.dataArr.push(obj);
		          		// console.log(arr)
		          	})
		          // this.tableData3.push(arr);
		          // console.log(this.dataArr)
		        }).catch(function(error){
		            console.log(error)
		        })
		    },
		    // 编辑表单，自动填入数据
		    changeData: function(index, id){
		    	this.dialogVisible = true;
		    	this.id = this.dataArr[index].id;
		    	this.title = this.dataArr[index].title;
		    	this.student = this.dataArr[index].student;
		    	this.date = this.dataArr[index].date;
		    	this.emolument = this.dataArr[index].emolument;
		    	this.address = this.dataArr[index].address;
		    	this.demand = this.dataArr[index].demand;
		    	this.index = index;
		    },
		    // 编辑表单，提交修改
		    checkChange: function(){
		    	axios.post(`${api}/admin/v1/education-order/${this.id}`,{
		    		title: this.title,
		    		student: this.student,
		    		date: this.date,
		    		emolument: this.emolument,
		    		address: this.address,
		    		demand: this.demand
		    	}).then((res)=>{
		          	console.log(res);
		          	if(res.data.code == 200){
		          		this.dataArr[this.index].id = this.id;
				    	this.dataArr[this.index].title = this.title;
				    	this.dataArr[this.index].student = this.student;
				    	this.dataArr[this.index].date = this.date;
				    	this.dataArr[this.index].emolument = this.emolument;
				    	this.dataArr[this.index].address = this.address;
				    	this.dataArr[this.index].demand = this.demand;
		          		this.$message({
				          message: '修改成功',
				          type: 'success',
				          center: true,
				          duration: 1000
				        });
		          		this.dialogVisible = false;
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
		    	this.title = this.dataArr[index].title;
		    	this.student = this.dataArr[index].student;
		    	this.date = this.dataArr[index].date;
		    	this.emolument = this.dataArr[index].emolument;
		    	this.address = this.dataArr[index].address;
		    	this.demand = this.dataArr[index].demand;
		    	this.createDate = this.dataArr[index].createDate;
		    	console.log(this.id);
		    },
		    // 确认删除
		    deleteItem: function(){
		    	axios.delete(`${api}/admin/v1/education-order/${this.id}`).then((res)=>{
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