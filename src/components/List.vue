<template>
	<section v-loading="loading">
		<el-col :span="24" class="searchBlock">
			<el-col :span="4">
				<span class="searchTitle">时间:</span><el-input style="width: 150px" size="small" clearable></el-input>
			</el-col>
			<el-col :span="4">
				<span class="searchTitle">时间:</span><el-input style="width: 150px" size="small" clearable></el-input>
			</el-col>
			<el-col :span="4">
				<span class="searchTitle">时间:</span>
				<el-date-picker
					style="width: 150px"
					size="small"
					type="date"
					placeholder="选择日期时间">
    			</el-date-picker>
			</el-col>
			<el-col :span="4">
				<span class="searchTitle">时间:</span><el-input style="width: 150px" size="small" clearable></el-input>
			</el-col>
			<el-col :span="4">
				<span class="searchTitle">时间:</span><el-input style="width: 150px" size="small" clearable></el-input>
			</el-col>
<!-- 			<el-input style="width: 150px" size="small"></el-input>
			<el-input style="width: 150px" size="small"></el-input> -->
			<el-col style="margin-top: 10px;margin-left: 10px;">
				<el-button type="primary" size="small" style="height: 30px;">查询</el-button>
				<el-button type="primary" size="small" style="height: 30px;">增加</el-button>
				<el-button type="danger" size="small" style="height: 30px;">删除</el-button>
			</el-col>
			
		</el-col>
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
	      	<el-table-column label="操作" width="250" header-align="center" >
				<template slot-scope="scope">
				<el-button  size="small">查看</el-button>
				<el-button type="primary" size="small" >发布</el-button>
				<el-button type="danger" size="small">删除</el-button>
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
	</section>
</template>
<script>
	import axios from 'axios';
	import {API} from '../util.js';
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
				
				loading: false,

				pageIndex: 1,
				total: 0,

			}
		},
		methods: {
			// 初始化分页获取列表数据
			getData: function(){
				// console.log(api);
				let auth = sessionStorage.getItem('token');
				axios({
					url: API.list,
					method: 'get',
					headers: {
						'Authorization': 'Bearer '+auth,
					}
				}).then((res)=>{
		          	console.log(res);
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
		    },
		    // 编辑表单，自动填入数据
		    showItem: function(index, id){
		    	
		    },
		    sendItem: function(index, id){
		    	
		    },
		    // 编辑表单，提交修改
		    checkChange: function(){
		    	
		    },
		    // 点击删除，弹窗确认
		    openDelete: function(index,id){
		    	
		    },
		    // 确认删除
		    deleteItem: function(){
		    	
		    }
		},
		// 生命周期钩子，挂载结束
		mounted(){
			// this.getData();
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
	.searchTitle{
		display:inline-block;
		color: #666;
		font-size: 14px;
		margin: 0 10px;
	}
	.searchBlock{
		text-align: left;
		padding: 20px 10px;
		background-color: #d3d3d3;
		border-radius: 10px;
		margin-bottom: 10px;
	    background: -webkit-linear-gradient(0deg,#e5e5e5, #d3d3d3); /* Safari 5.1 - 6.0 */
	    background: -o-linear-gradient(0deg,#e5e5e5, #d3d3d3); /* Opera 11.1 - 12.0 */
	    background: -moz-linear-gradient(0deg,#e5e5e5, #d3d3d3); /* Firefox 3.6 - 15 */
	    background: linear-gradient(0deg,#e5e5e5, #d3d3d3); 
	}
</style>