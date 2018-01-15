<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo">ADMIN SYSTEM</el-col>
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
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
              <el-menu-item index="/list">选项1</el-menu-item>
              <el-menu-item index="/table">选项2</el-menu-item>
              <el-menu-item index="/form">选项3</el-menu-item>
              <el-menu-item index="/hello">选项4</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">权限控制</span>
            </template>
              <el-menu-item index="/user">用户列表</el-menu-item>
              <el-menu-item index="/role">角色列表</el-menu-item>
              <el-menu-item index="/auth">权限列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">导航三</span>
            </template>
              <el-menu-item index="/hello">选项1</el-menu-item>
              <el-menu-item index="/hello">选项2</el-menu-item>
              <el-menu-item index="/hello">选项3</el-menu-item>              
              <el-menu-item index="/hello">选项1</el-menu-item>
              <el-menu-item index="/hello">选项2</el-menu-item>
              <el-menu-item index="/hello">选项3</el-menu-item>
          </el-submenu>
        </el-menu>
      </aside>
      <section class="content">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </section>
    </el-col>
  </el-row>
</template>
<script>
  export default{
    data(){
      return{

      }
    },
    methods: {
      quit(){
        sessionStorage.removeItem('lg');
        // console.log(123)
        this.$router.push({
          path: '/login'
        })
      }
    }
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
    height: 50px;
    line-height: 50px;
    background-color: #459ac1;
    color: #fff;
  }
  .logo{
    width: 220px;
    border-right: 1px solid #fff;
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
    top: 50px;
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
    background-color: #373737;
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
    min-width: 1000px;
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