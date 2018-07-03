<template>
    <section v-loading="loading">
        <el-col :span="24" class="searchBlock">
            <el-col style="margin-top: 10px;margin-left: 10px;">
                <el-button type="primary" size="small" style="height: 30px;" @click="add">增加</el-button>
            </el-col>

        </el-col>
        <el-table :data="dataArr" max-height="100%"
                  style="width: 100%;border: 1px solid #e5e5e5;color:#333;margin-bottom: 20px;">
            <el-table-column type="index" sortable width="55" header-align="center">
            </el-table-column>
            <el-table-column prop="name" label="姓名" min-width="100" header-align="center">
            </el-table-column>
            <el-table-column prop="content" label="内容" min-width="100" header-align="center">
            </el-table-column>
            <el-table-column prop="address" label="地址" min-width="200" header-align="center">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" min-width="200" header-align="center">
            </el-table-column>
            <el-table-column label="操作" width="250" header-align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="updateItem(scope.$index,scope.row.id)">修改</el-button>
                    <el-button type="danger" size="small" @click="deleteItem(scope.row.id)">删除</el-button>
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
            title="修改信息"
            :visible.sync="updateVisible"
            width="40%"
            center>
            <el-row class="item">
                <el-col :span="5">
                    <p class="title">id：</p>
                </el-col>
                <el-col class="input" :span="14">
                    <el-input v-model="checkId" disabled></el-input>
                </el-col>
            </el-row>
            <el-row class="item">
                <el-col :span="5">
                    <p class="title">姓名：</p>
                </el-col>
                <el-col class="input" :span="14">
                    <el-input v-model="name"></el-input>
                </el-col>
            </el-row>
            <el-row class="item">
                <el-col :span="5">
                    <p class="title">内容：</p>
                </el-col>
                <el-col class="input" :span="14">
                    <el-input v-model="content"></el-input>
                </el-col>
            </el-row>
            <el-row class="item">
                <el-col :span="5">
                    <p class="title">地址：</p>
                </el-col>
                <el-col class="input" :span="14">
                    <el-input v-model="address"></el-input>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="update">确 定</el-button>
			</span>
        </el-dialog>
        <el-dialog
            title="增加"
            :visible.sync="addVisible"
            width="40%"
            center>
            <el-row class="item">
                <el-col :span="5">
                    <p class="title">姓名：</p>
                </el-col>
                <el-col class="input" :span="14">
                    <el-input v-model="addName"></el-input>
                </el-col>
            </el-row>
            <el-row class="item">
                <el-col :span="5">
                    <p class="title">内容：</p>
                </el-col>
                <el-col class="input" :span="14">
                    <el-input v-model="addContent"></el-input>
                </el-col>
            </el-row>
            <el-row class="item">
                <el-col :span="5">
                    <p class="title">地址：</p>
                </el-col>
                <el-col class="input" :span="14">
                    <el-input v-model="addAddress"></el-input>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addItem">确 定</el-button>
			</span>
        </el-dialog>
    </section>
</template>
<script>
	export default {
		data() {
			return {
				dataArr: [],
				loading: false,
				pageIndex: 1,
				total: 0,
                checkId: 0,
                name: '',
                content: '',
                address: '',
                updateVisible: false,
                addVisible: false,
                addName: '',
                addContent: '',
                addAddress: '',

			}
		},
		methods: {
			// 初始化分页获取列表数据
			getData() {
                this.axios({
                    url: this.API.List.list_url,
                    method: 'get',
                    params: {
                    	pageIndex: 1,
                        pageSize: 10,
                    },
                    headers: {
                    	'Authorization': sessionStorage.getItem('token')
                    }
                }).then((rsp)=>{
                	let res = rsp.data;
                	console.log(res)
                    if(res.code === 200){
                        this.dataArr = res.data;
                    }else{

                    }
                }).catch((err)=>{
                	console.log(err);
                })
			},
            addItem(){
			    this.axios({
                    url: this.API.List.addList_url,
                    method: 'post',
                    data: {
                    	name: this.addName,
                        content: this.addContent,
                        address: this.addAddress
                    },
                }).then((rsp)=>{
			    	let res = rsp.data;
			    	if(res.code === 200){
			    		this.addVisible = false;
			    		this.getData();
                    }else{
			    		console.log(res.msg);
                    }
			    	console.log(res);
                }).catch((err)=>{
			    	console.log(err);
                })
            },
            add(){
            	this.addVisible = true;
            },
			// 分页器点击跳转
			pageChange(val) {
				this.pageIndex = val;
				this.getData()
			},
            updateItem(index,id){
                console.log(index)
                console.log(id)
                this.checkId = id;
                this.name = this.dataArr[index].name;
                this.content = this.dataArr[index].content;
                this.address = this.dataArr[index].address;
                this.updateVisible = true;
            },
            update(){
				this.axios({
					url: this.API.List.updateList_url+this.checkId,
					method: 'post',
					data: {
						name: this.name,
						content: this.content,
						address: this.address,
					},
				}).then((rsp)=>{
					let res = rsp.data;
					if(res.code === 200){
						this.updateVisible = false;
						this.getData();
					}else{
						console.log(res.msg);
					}
					console.log(res);
				}).catch((err)=>{
					console.log(err);
				})
            },
			// 确认删除
			deleteItem(id) {
				this.axios({
					url: this.API.List.deleteList_url+id,
					method: 'delete',
				}).then((rsp)=>{
					let res = rsp.data;
					if(res.code === 200){
						this.getData();
					}else{
						console.log(res.msg);
					}
					console.log(res);
				}).catch((err)=>{
					console.log(err);
				})
			}
		},
		// 生命周期钩子，挂载结束
		mounted() {
			 this.getData();
		}
	}
</script>
<style scoped>
    .item {
        margin-bottom: 10px;

        /*background-color: #999;*/
        /*border-bottom: 1px solid #e5e5e5;*/
    }

    .half {
        width: 50%;
        float: left;
    }

    .title {
        text-align: right;
        height: 50px;
        line-height: 50px;
        margin: 0;
    }

    .input {
        line-height: 50px;
        padding-left: 10px;
    }

    .type {
        text-align: left;
        /*text-indent: 10px;*/
        /*height: 50px;*/
        line-height: 50px;
        padding-left: 10px;
    }

    .content {
        text-align: left;
        text-indent: 10px;
        height: 50px;
        line-height: 50px;
        margin: 0;
    }

    .btn {
        height: 50px;
        line-height: 50px;
    }

    .searchTitle {
        display: inline-block;
        color: #666;
        font-size: 14px;
        margin: 0 10px;
    }

    .searchBlock {
        text-align: left;
        padding: 20px 10px;
        background-color: #d3d3d3;
        border-radius: 10px;
        margin-bottom: 10px;
        background: -webkit-linear-gradient(0deg, #e5e5e5, #d3d3d3); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(0deg, #e5e5e5, #d3d3d3); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(0deg, #e5e5e5, #d3d3d3); /* Firefox 3.6 - 15 */
        background: linear-gradient(0deg, #e5e5e5, #d3d3d3);
    }
</style>