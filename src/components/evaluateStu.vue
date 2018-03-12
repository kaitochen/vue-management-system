<template>
	<section v-loading="loading">
		<el-table  :data="dataArr"  max-height="100%"  style="width: 100%;border: 1px solid #e5e5e5;color:#333;margin-bottom: 20px;">
			<el-table-column type="index" sortable width="55" header-align="center" >
			</el-table-column>
			<el-table-column prop="studentName" label="学生姓名" min-width="100" header-align="center">
			</el-table-column>			
			<el-table-column prop="merit" label="优缺点" min-width="200" header-align="center">
			</el-table-column>				
			<el-table-column prop="defect" label="学习进度" min-width="200" header-align="center">
			</el-table-column>			
			<el-table-column prop="platformSuggest" label="平台建议" min-width="200" header-align="center">
			</el-table-column>			
			<el-table-column prop="serviceSuggest" label="服务建议" min-width="200" header-align="center">		
			</el-table-column>			
			<el-table-column prop="contact" label="联系方式" min-width="200" header-align="center">
			</el-table-column>			
	      	<el-table-column label="操作" width="100" header-align="center">
				<template slot-scope="scope">
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

				deleteVisible: false,

				id: 0,

				pageIndex: 1,
				total: 100,
				loading: true,
			}
		},
		methods: {
			// 初始化分页获取列表数据
			getData: function(){
				// console.log(api);
				axios.get(`${api}/admin/v1/teacher-comment-student/list?pageIndex=${this.pageIndex}&pageSize=20`).then((res)=>{
		          	// console.log(res);
		          	let list = res.data.data.list;
		          	this.total = res.data.data.total;
		          	list.map((i)=>{
		          		let obj = {
		          			id: i.id ,
							studentName: i.studentName,
							merit: i.merit,
							defect: i.defect,
							platformSuggest: i.platformSuggest,
							serviceSuggest: i.serviceSuggest,
							contact: i.contact,
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
		    // 分页器点击跳转
		    pageChange: function(val){
		    	this.pageIndex = val;
		    	this.loading = true;
		    	axios.get(`${api}/admin/v1/teacher-comment-student/list?pageIndex=${this.pageIndex}&pageSize=20`).then((res)=>{
		          	let list = res.data.data.list;
		          	this.total = res.data.data.total;
		          	this.dataArr = [];
		          	list.map((i)=>{
		          		let obj = {
		          			id: i.id ,
							studentName: i.studentName,
							merit: i.merit,
							defect: i.defect,
							platformSuggest: i.platformSuggest,
							serviceSuggest: i.serviceSuggest,
							contact: i.contact,
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
		    // 点击删除，弹窗确认
		    openDelete: function(index,id){
		    	this.deleteVisible = true;
		    	this.id = this.dataArr[index].id;
		    	this.createDate = this.dataArr[index].createDate;
		    },
		    // 确认删除
		    deleteItem: function(){
		    	axios.delete(`${api}/admin/v1/teacher-comment-student/${this.id}`).then((res)=>{
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