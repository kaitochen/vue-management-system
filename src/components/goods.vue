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
			<el-col style="margin-top: 10px;margin-left: 10px;">
				<el-button type="primary" size="small" style="height: 30px;">查询</el-button>
				<el-button type="primary" size="small" style="height: 30px;" @click="">增加券商品</el-button>
			</el-col>
			
		</el-col>
		<el-table  :data="dataArr"  max-height="100%"  style="width: 100%;border: 1px solid #e5e5e5;color:#333;margin-bottom: 20px;">
			<el-table-column type="index" sortable width="55" header-align="center" >
			</el-table-column>
			<!-- <el-table-column type="selection"  width="55"></el-table-column> -->
			<el-table-column prop="id" label="id" min-width="100" header-align="center">
			</el-table-column>				
			<el-table-column prop="name" label="产品名称" min-width="100" header-align="center">
			</el-table-column>				
			<el-table-column prop="inventory" label="产品库存" min-width="100" header-align="center">			
			</el-table-column>				
			<el-table-column prop="createDate" label="发布时间" min-width="200" header-align="center">
			</el-table-column>			
			<el-table-column prop="integral" label="兑换所需积分" min-width="100" header-align="center">			
			</el-table-column>	
			<el-table-column prop="state" label="状态" min-width="100" header-align="center">
			</el-table-column>				
	      	<el-table-column label="操作" width="300" header-align="center" >
				<template slot-scope="scope">
					<el-button type="primary"  size="small" @click="showUpdate(scope.$index, scope.row.id)">修改</el-button>
					<el-button type="danger"  size="small" @click="showDelete(scope.$index, scope.row.id)">删除</el-button>
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

		<el-dialog
			title="删除商品"
			:visible.sync="deleteVisible"
			width="40%"
			center>
			<p style="text-align: center">确认删除id为{{this.deleteId}}的商品吗？</p>
			<span slot="footer" class="dialog-footer">
				<!-- <el-button  @click="">取 消</el-button> -->
				<el-button type="primary" @click="deleteItem">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog
			title="修改商品"
			:visible.sync="updateVisible"
			width="50%"
			center>
			<el-row class="item">
				<el-col  :span="5">
					<p class="title">名称：</p>
				</el-col>
				<el-col class="input" :span="14">
					<el-input v-model="name"></el-input>
				</el-col>
			</el-row>

			<el-row class="item">
				<el-col  :span="5">
					<p class="title">是否需要审核：</p>
				</el-col>
				<el-col class="input" :span="14">
					<el-input v-model="check"></el-input>
				</el-col>
			</el-row>	
			<el-row class="item">
				<el-col  :span="5">
					<p class="title">兑换所需积分：</p>
				</el-col>
				<el-col class="input" :span="14">
					<el-input v-model="integral"></el-input>
				</el-col>
			</el-row>	
			<el-row class="item">
				<el-col  :span="5">
					<p class="title">库存：</p>
				</el-col>
				<el-col class="input" :span="14">
					<el-input v-model="inventory"></el-input>
				</el-col>
			</el-row>	
			<el-row class="item">
				<el-col  :span="5">
					<p class="title">所属交易所：</p>
				</el-col>
				<el-col class="input" :span="14">
					<el-input v-model="org"></el-input>
				</el-col>
			</el-row>	
			<el-row class="item">
				<el-col  :span="5">
					<p class="title">销量：</p>
				</el-col>
				<el-col class="input" :span="14">
					<el-input v-model="sales"></el-input>
				</el-col>
			</el-row>	
			<el-row class="item">
				<el-col  :span="5">
					<p class="title">是否上架：</p>
				</el-col>
				<el-col class="input" :span="14">
					<el-input v-model="status"></el-input>
				</el-col>
			</el-row>	
			<el-row class="item">
				<el-col  :span="5">
					<p class="title">券类型：</p>
				</el-col>
				<el-col class="input" :span="14">
					<el-input v-model="ticketType"></el-input>
				</el-col>
			</el-row>	
			<el-row class="item">
				<el-col  :span="5">
					<p class="title">券价值：</p>
				</el-col>
				<el-col class="input" :span="14">
					<el-input v-model="ticketValue"></el-input>
				</el-col>
			</el-row>	
			<!-- <p style="text-align: center">确认删除该用户？</p> -->
			<span slot="footer" class="dialog-footer">
				<!-- <el-button  @click="">取 消</el-button> -->
				<el-button type="primary" @click="">确 定</el-button>
			</span>
		</el-dialog>
	</section>
</template>
<script>
	import axios from 'axios';
	import {goods_API} from '../util.js';
	export default{
		data(){ 
			return {
				dataArr: [],
				loading: false,
				pageIndex: 1,
				total: 0,

				auth: sessionStorage.getItem('token'),

				updateVisible: false,
				deleteVisible: false,
				deleteId: '',
				updateId: '',

				name: '',
				check: '',
				integral: '',
				inventory: '',
				org: '',
				sales: '',
				status: '',
				ticketType: '',
				ticketValue: '',
			}
		},
		methods: {
			// 初始化分页获取列表数据
			getData(){
				this.loading = true;
                // let auth = sessionStorage.getItem('token');
				axios({
					url: goods_API.list,
					method: 'get',
					data: {pageIndex: this.pageIndex,pageSize: 20},
					headers: {
                        'Authorization': 'Bearer '+this.auth,
                    }
				}).then((rsp)=>{
					let res = rsp.data;
		          	// console.log(res);
		          	this.dataArr = res.data.list.map((item)=>{item.state = (item.status === 1?'已上架':'已下架');return item});
		          	this.loading = false;
		          	this.total = res.data.total;
		        }).catch(function(error){
		            console.log(error)
		        })
			},
		    // 分页器点击跳转
		    pageChange(val){
		    	this.pageIndex = val;
		    	// this.loading = true;
		   
		    },
		    showUpdate(index,id){
		    	this.updateVisible = true;
		    	this.updateId = id;
		    },
		    update(){
		    	axios({
		    		url: Live_API.mute(this.phone,0),
		    		method: 'get',
		    		headers: {
                        'Authorization': 'Bearer '+this.auth,
                    }
		    	}).then((rsp)=>{
		    		let res = rsp.data;
		    		console.log(res);
		    		if(res.code === 200){
		    			this.updateVisible = false;
		    			this.phone = '';
		    			this.nickname = '';
		    			this.$message({
							message: '解除用户禁言成功',
							type: 'success',
							duration: 1000
						});
		    			this.getData()
		    		}else{
						this.$message({
							message: '解除用户禁言失败',
							type: 'success',
							duration: 1000
						});
		    		}
		    	}).catch((err)=>{
		    		console.log(err);
		    	})
		    },
		    showDelete(index,id){
		    	this.deleteVisible = true;
		    	this.deleteId = id;	
		    },
		    deleteItem(){
				axios({
		    		url: goods_API.delete_goods(this.deleteId),
		    		method: 'delete',
		    		headers: {
                        'Authorization': 'Bearer '+this.auth,
                    }
		    	}).then((rsp)=>{
		    		let res = rsp.data;
		    		console.log(res);
		    		this.deleteVisible = false;
		    		this.deleteId = '';
		    		if(res.code === 200){
		    			this.$message({
							message: '删除商品成功',
							type: 'success',
							duration: 1000
						});
		    			this.getData()
		    		}else{
						this.$message({
							message: '删除商品失败',
							type: 'success',
							duration: 1000
						});
		    		}
		    	}).catch((err)=>{
		    		console.log(err);
		    	})
		    }
		    // navigateAdd: function(){
		    // 	this.$router.push({path: '/addUser'})
		    // },
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