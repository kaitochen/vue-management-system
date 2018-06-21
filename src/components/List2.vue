<template>
    <section v-loading="loading">
        <el-col :span="24" class="searchBlock">
            <el-col :span="6">
                <span class="searchTitle">审核状态:</span>
                <el-select v-model="states" @change="changeState" size="small" style="width: 150px;">
                    <el-option :key="0" label="全部" :value="0"></el-option>
                    <el-option :key="1" label="审核中" :value="1"></el-option>
                    <el-option :key="2" label="未通过" :value="2"></el-option>
                </el-select>
            </el-col>
        </el-col>
        <el-table :data="dataArr" max-height="100%"
                  style="width: 100%;border: 1px solid #e5e5e5;color:#333;margin-bottom: 20px;">
            <el-table-column prop="id" label="id" min-width="100" header-align="center">
            </el-table-column>
            <el-table-column prop="eduContent" label="教学内容" min-width="100" header-align="center">
            </el-table-column>
            <el-table-column prop="eduAddress" label="教学地点" min-width="100" header-align="center">
            </el-table-column>
            <el-table-column prop="price" label="价格(元)" min-width="100" header-align="center">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" min-width="150" header-align="center">
            </el-table-column>
            <el-table-column label="操作" width="300" header-align="center">
                <template slot-scope="scope">
                    <el-button size="small" type="success" @click="showCheck(scope.$index,scope.row.id)">审核</el-button>
                    <el-button size="small" type="primary" @click="gotoUpdate(scope.$index,scope.row.id)">修改开班信息
                    </el-button>
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
            title="审核"
            :visible.sync="checkVisible"
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
                    <p class="title">教学内容：</p>
                </el-col>
                <el-col class="input" :span="14">
                    <el-input v-model="className" disabled></el-input>
                </el-col>
            </el-row>
            <el-row class="item">
                <el-col :span="5">
                    <p class="title">价格：</p>
                </el-col>
                <el-col class="input" :span="14">
                    <el-input v-model="price"></el-input>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="updateClass">确 定</el-button>
			</span>
        </el-dialog>
    </section>


</template>
<script>
	import axios from 'axios';


	export default {
		props: ['params'],
		data() {
			return {
				dataArr: [],
				loading: false,
				pageIndex: 1,
				total: 3,
                states: 0,

				checkVisible: false,
				checkId: '',
				className: '',
				price: 0,

                showVisible: false,
                checkData: [],

				changeSon: false,
				classId: '',
				checkName: '',


			}
		},
		methods: {
			// 初始化分页获取列表数据
			getData() {
//				this.loading = true;
				this.dataArr = [ {
					"createTime": "2018-06-08 09:19:56",
					"eduAddress": "线上教学",
					"eduContent": "ps入门",
					"id": 1,
					"price": 500,
				}, {

					"createTime": "2018-06-07 09:18:44",
					"eduAddress": "广州市番禺区",
					"eduContent": "微信小程序入门",
					"id": 2,
					"price": 998,
				},{
					"createTime": "2018-06-06 14:18:26",
					"eduAddress": "广州市天河区黄埔大道西601号暨南大学",
					"eduContent": "日语入门",
					"id": 3,
					"price": 499,
				}]
			},
			// 分页器点击跳转
			pageChange(val) {
				this.pageIndex = val;
				// this.loading = true;
				this.getData();
			},
			showCheck(index, id) {
//            	console.log(this.dataArr[index])
				this.checkVisible = true;
				this.className = this.dataArr[index].eduContent;
				this.checkId = id;
				this.price = this.dataArr[index].price;
			},
			updateClass() {

			},
			changeState(val) {
				console.log(val)
				this.pageIndex = 1;
				this.getData();
			},
            gotoUpdate(index,id){
				this.setTab({title: '功能2_1',url: '/example2_1',params: this.dataArr[index]})
            },

		},
		// 生命周期钩子，挂载结束
		mounted() {
			this.getData();
            this.$eventHub.$on('FRESH',(name)=>{
            	if(name === '/example1_2'){
            		this.getData();
                }
            })
		}
	}
</script>
<style scoped>
    .item {
        margin-bottom: 10px;
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
