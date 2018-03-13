<template>
    <el-row class="container">
        <el-col :span="24" class="header">
            <el-col :span="10" class="logo">轻松盈</el-col>
            <el-col :span="4" class="user" >
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                admin<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="quit">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            </el-col>
        </el-col>
        <el-col :span="24" class="main">
            <aside class="aside">
                <el-menu
                  default-active="2"
                  class="el-menu-vertical-demo"
                  unique-opened
                  router>
                    <template v-for="(item,index) in roleRouter">
                        <el-submenu :index="index.toString()" >
                            <template slot="title"><i class="el-icon-menu"></i>{{item.title}}</template>
                            <el-menu-item v-for="child in item.children" :index="router[index]" :key="child.url">{{child.title}}</el-menu-item>
                        </el-submenu>
                    </template>
<!--                     <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>家教</span>
                        </template>
                        <el-menu-item index="/tutor">家教信息</el-menu-item>
                        <el-menu-item index="/release">家长报名</el-menu-item>
                        <el-menu-item index="/resume">简历投递</el-menu-item>
                        <el-menu-item index="/teacher">教师展示</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span slot="title">评价</span>
                        </template>
                        <el-menu-item index="/evaluateStu">学员评价</el-menu-item>
                        <el-menu-item index="/evaluateTutor">教员评价</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                          <i class="el-icon-setting"></i>
                          <span slot="title">咨询</span>
                        </template>
                        <el-menu-item index="/service">咨询服务</el-menu-item>
                        <el-menu-item index="/list">test</el-menu-item>
                    </el-submenu> -->
                </el-menu>
            </aside>
          <section class="content">
            <el-col :span="24" style="margin-bottom: 15px;">
                <el-breadcrumb separator-class="el-icon-arrow-right" >
                    <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                        {{ item.name }}
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
            <el-col>
                <transition name="fade" mode="out-in">
                    <router-view :token="token"></router-view>
                </transition>
            </el-col>
          </section>
        </el-col>
    </el-row>
</template>
<script>
    import axios from 'axios';
    import API from '../util.js';
    export default{
        data(){
            return{
                token: sessionStorage.getItem('token'),
                roleRouter: [],
                router: ['/list','/user','/']
            }
        },
        methods: {
            quit(){
                sessionStorage.removeItem('token');
                this.$router.push({
                  path: '/login'
                })
            },
            getRole(){
                let auth = sessionStorage.getItem('token');
                // console.log(auth);

                axios({
                    url: API.role,
                    method: 'get',
                    headers: {
                        'Authorization': 'Bearer '+auth,
                    }
                }).then((rsp)=>{
                    let res = rsp.data;
                    this.roleRouter = res.data;
                }).catch(function(error){
                    console.log(error)
                })
            },
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
           
            // console.log(document.cookie);

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
        // mounted(){
        //   this.getTest();
        //   // console.log(this.token)
        // }
    }
</script>
<style scoped>
  .container{
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    min-width: 1280px;
    overflow: auto;
  }
  .header{
    height: 80px;
    line-height: 80px;
    /*background-color: #069ee4;*/
    background: -webkit-linear-gradient(90deg,#069ee4, #b1def3); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(90deg,#069ee4, #b1def3); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(90deg,#069ee4, #b1def3); /* Firefox 3.6 - 15 */
    background: linear-gradient(90deg,#069ee4, #b1def3); /* 标准的语法 */
/*    background-image: url('../assets/bg.jpg');
    background-position: 0 95%;*/
    color: #fff;
  }
  .logo{
    width: 220px;
    /*border-right: 1px solid #fff;*/
    box-sizing: border-box;
  }
  .user{
    float: right;
    color: #fff;
  }
  .el-dropdown-link{
    display: block;
    width: 100%;
    height: 100%;
    color: #fff;
    cursor: pointer;
  }
  .main{
    display: flex;
    position: absolute;
    top: 80px;
    bottom: 0px;
    overflow: hidden;
  }
  .aside{
    flex: 0 0  220px;
    width: 220px;
    box-sizing: border-box;
    overflow-y: auto;
  }
  .el-menu{
    height: 100%;
    /*border-right: 0;*/
    text-align: left; 
    background-color: #666;
  }
  .el-submenu .el-menu-item{
    height: 40px;
    line-height: 40px;
  }
  .is-opened{
    background-color: #494949;
  }
/*  .is-opened .el-submenu__title{
    border-right: 5px solid #5d8fa7;
  }*/

  .content{
    padding: 20px;
    width: 100%;
    overflow: auto;
    min-width: 750px;
    overflow: auto;
    /*background-color: #eee;*/
  }
  ::-webkit-scrollbar {
      width: 8px;
  }
  ::-webkit-scrollbar-track {
      background-color: #eee;
  } /* 滚动条的滑轨背景颜色 */

  ::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2); 
  } /* 滑块颜色 */

  ::-webkit-scrollbar-button {
      background-color: #eee;
  } /* 滑轨两头的监听按钮颜色 */

  ::-webkit-scrollbar-corner {
      background-color: black;
  } /* 横向滚动条和纵向滚动条相交处尖角的颜色 */
</style>