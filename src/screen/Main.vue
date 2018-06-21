<template>
    <el-row class="container">
        <el-col :span="24" class="header">
            <el-col :span="10" class="logo">后台管理系统</el-col>
            <el-col :span="4" class="user">
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">{{userName}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="quit">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-col>
        <el-col :span="24" class="main">
            <aside class="aside">
                <el-menu unique-opened>
                    <template v-for="(item,index) in roleRouter">
                        <el-submenu :index="index.toString()">
                            <template slot="title"><i class="el-icon-menu"></i>{{item.title}}</template>
                            <el-menu-item v-for="(child,i) in item.children" :index="index.toString()" @click="checkTab(child)" :key="index+i">
                                {{child.title}}
                            </el-menu-item>
                        </el-submenu>
                    </template>
                </el-menu>
            </aside>
            <section class="content" id="content">
                <el-col :span="24">
                    <el-row :span="24">
                        <el-col :span="1">
                            <el-popover trigger="click" placement="bottom-start" >
                                <el-button style="height: 40px" size="mini" slot="reference" icon="el-icon-more-outline"></el-button>
                                <p class="popoverItem" @click="freshCheck">刷新选中页</p>
                                <p class="popoverItem" @click="closeAll">关闭全部页面</p>
                                <p class="popoverItem" @click="closeOther">关闭非选中页</p>
                            </el-popover>
                        </el-col>
                        <el-col :span="22">
                            <el-tabs  v-model="tabActive" type="card"  closable @tab-click="checkIndex" @tab-remove="removeTab">
                                <el-tab-pane
                                    v-for="(item,index) in tabArr"
                                    :key="item.name"
                                    :label="item.title"
                                    :name="item.name"
                                >
                                </el-tab-pane>
                            </el-tabs>
                        </el-col>
                    </el-row>
                    <template v-for="item in tabArr">
                        <div v-show="item.name === tabActive">
                            <router-view :name="item.name" :params="item.params" :ref="item.name" ></router-view>
                        </div>
                    </template>
                </el-col>

            </section>
        </el-col>
    </el-row>
</template>
<script>
	import axios from 'axios';
    import {routeList} from '../router/routes';
    import Vue from 'vue'

	export default {
		data() {
			return {
				token: sessionStorage.getItem('token'),
				userName: sessionStorage.getItem('name'),
				roleRouter: [],
				tabActive: '/home',
                tabIndex: 0,
				tabArr: [
					{
                        title: '首页',
                        name: '/home',
				    }
				],
				// router: ['/functions','/exchangeLog','/ticket','/addUser']
			}
		},
		methods: {
			//退出登录，即清除token，回到login界面
			quit() {
				sessionStorage.removeItem('token');
				this.$router.push({
					path: '/login'
				})
			},
			getRole() {
//				let auth = sessionStorage.getItem('token');
//				axios({
//					url: API.role,
//					method: 'get',
//					headers: {
//						'Authorization': 'Bearer ' + auth,
//					}
//				}).then((rsp) => {
//					let res = rsp.data;
//					this.roleRouter = res.data;
//				    if (res.code === 401) {
//						this.$alert('登录信息过期，请重新登录!', '登录提醒', {
//							confirmButtonText: '重新登录',
//							callback: action => {
//								this.$router.push({path: '/login'})
//							}
//						})
//						;
//					}
//				}).catch(function (error) {
//					console.log(error)
//				})
                //此处为功能列表获取，该处的设计实现请自行完成
                this.roleRouter = [
                    {
                    	title: '功能1',
                        role: 'example1',
                        children: [
                            {
                            	title: '功能1_1',
                                url: '/example1_1'
                            },{
                    		    title: '功能1_2',
                                url: '/example1_2'
                            }
                        ]
                    },{
						title: '功能2',
                        role: 'example2',
						children: [
							{
								title: '功能2_1',
								url: '/example2_1'
							}
						]
                    }
                ]
			},
            //关闭窗口
			removeTab(targetName) {
				let tabs = this.tabArr;
				let activeName = this.tabActive;
				if (activeName === targetName) {
					tabs.forEach((tab, index) => {
						if (tab.name === targetName) {
							let nextTab = tabs[index + 1] || tabs[index - 1];
							if (nextTab) {
								activeName = nextTab.name;
							}
						}
					});
				}
				this.tabActive = activeName;
				this.tabArr = tabs.filter(tab => tab.name !== targetName);
			},
            //增加或选择窗口
            checkTab(child){
				let hadTab = false;
				let tabs = this.tabArr;
                let targetName = child.url;
                tabs.forEach((tab,index)=>{
                	if(tab.name === targetName){
                		hadTab = true;
                		this.tabActive = targetName;
                		this.tabIndex = index;
                		return;
                    }else{

                    }
                })
                if(hadTab){

                }else{
					this.tabArr.push({
						title: child.title,
						name: child.url,
                        params: child.params!==undefined?child.params: null,
					});
					this.tabIndex = this.tabArr.length-1;
                }
				this.tabActive = child.url;
            },
            //获取选中页对应的索引
            checkIndex(cp){
//				console.log('index',cp.index);
				this.tabIndex = parseInt(cp.index)
            },
            //关闭全部界面，并保持首页显示
            closeAll(){
                console.log('all');
                this.tabArr = [{
					title: '首页',
					name: '/home',
				}];
                this.tabActive = '/home'
			},
            //关闭选中页右侧的所有窗口
            closeRight(){
//                console.log(this.tabIndex)
                console.log(this.tabArr.splice(this.tabIndex+1));
            },
            //关闭除了选中页以外的全部窗口
            closeOther(){
				let tabs = this.tabArr;
				let targetName = this.tabActive;
				this.tabArr = tabs.filter(tab => tab.name === targetName);
            },
            //触发选中页的刷新
            freshCheck(){
            	/*通过事件广播的形式，下发通知对应窗口对应的模块进行刷新*/
            	this.$eventHub.$emit('FRESH',this.tabActive)

                /*通过ref的形式获取对应窗口的模块，调用该模块内部的刷新方法去刷新，需要规定好内部的刷新方法的名字*/
                /*if(this.$refs[this.tabActive][0].fresh!==undefined){
					console.log('fresh')
					this.$refs[this.tabActive][0].fresh();
				}else{
					console.log('fresh function not exist')
				}*/
            }
		},
		beforeCreate: function () {
			console.group('beforeCreate 创建前状态===============》');
		},
		created: function () {
			console.group('created 创建完毕状态===============》');
		},
		beforeMount: function () {
			console.group('beforeMount 挂载前状态===============》');
		},
		mounted: function () {
			console.group('mounted 挂载结束状态===============》');
			this.getRole();
			//将切换多窗口的功能挂载至全局，所有子界面都可以直接使用，无需传入
			Vue.prototype.setTab = this.checkTab;

			console.log('enter main');

			//获取七牛云的上传token，在main界面挂载结束时获取，并且托管在vuex上，全局使用，每次使用上传功能就无需再次获取token
            //如果用户刷新界面，main界面都会重新加载，从而保证token一致有效，并且存在
            //获取token的形式根据七牛云的文档去实现，可通过后台接口获取，具体实现去自行实现
			this.axios({
				url: this.API.Upload.upload_token,
				method: 'get',
			}).then((rsp)=>{
				let res = rsp.data;
//				this.token = res.data.token;
				this.$store.commit('set',res.data.token);
			})

		},
		beforeUpdate: function () {
			console.group('beforeUpdate 更新前状态===============》');
		},
		updated: function () {
			console.group('updated 更新完成状态===============》');
			// console.log(this.token)
		},
		beforeDestroy: function () {
			console.group('beforeDestroy 销毁前状态===============》');
		},
		destroyed: function () {
			console.group('destroyed 销毁完成状态===============》');
		}
	}
</script>
<style scoped>
    .container {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        min-width: 1280px;
        overflow: auto;
    }

    .header {
        height: 80px;
        line-height: 80px;
        /*background-color: #069ee4;*/
        background: -webkit-linear-gradient(90deg, #069ee4, #b1def3); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(90deg, #069ee4, #b1def3); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(90deg, #069ee4, #b1def3); /* Firefox 3.6 - 15 */
        background: linear-gradient(90deg, #069ee4, #b1def3); /* 标准的语法 */
        /*    background-image: url('../assets/bg.jpg');
            background-position: 0 95%;*/
        color: #fff;
    }

    .logo {
        width: 220px;
        height: 80px;
        line-height: 80px;
        /*border-right: 1px solid #fff;*/
        box-sizing: border-box;
    }

    .user {
        float: right;
        color: #fff;
    }

    .el-dropdown-link {
        display: block;
        width: 100%;
        height: 100%;
        color: #fff;
        cursor: pointer;
    }

    .main {
        display: flex;
        position: absolute;
        top: 80px;
        bottom: 0px;
        overflow: hidden;
    }

    .aside {
        flex: 0 0 220px;
        width: 220px;
        box-sizing: border-box;
        overflow-y: auto;
    }

    .el-menu {
        min-height: 100%;
        /*border-right: 0;*/
        text-align: left;
        background-color: #666;
    }

    .el-submenu .el-menu-item {
        height: 40px;
        line-height: 40px;
    }

    .is-opened {
        background-color: #494949;
    }

    /*  .is-opened .el-submenu__title{
        border-right: 5px solid #5d8fa7;
      }*/

    .content {
        padding: 20px;
        width: 100%;
        overflow: auto;
        min-width: 750px;
        overflow: auto;
        /*background-color: #eee;*/
    }
    .right{
        width: 200px;
        height: 100px;
        background-color: #fff;
        box-shadow: 2px 2px 2px #e5e5e5;
        border: 1px solid #ccc;
        z-index: 99;
        position: absolute;
        left: 10px;
        top: 50px;
    }
    .popoverItem{
        width: 100%;
        height: 30px;
        line-height: 30px;
        color: #666;
        font-size: 14px;
        margin: 0;
        text-align: center;
        cursor: pointer;
    }
    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-track {
        background-color: #eee;
    }

    /* 滚动条的滑轨背景颜色 */

    ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
    }

    /* 滑块颜色 */

    ::-webkit-scrollbar-button {
        background-color: #eee;
    }

    /* 滑轨两头的监听按钮颜色 */

    ::-webkit-scrollbar-corner {
        background-color: black;
    }

    /* 横向滚动条和纵向滚动条相交处尖角的颜色 */
</style>
