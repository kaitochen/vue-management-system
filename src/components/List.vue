<template>
  <section>
      <el-col :span="24" class="title">
        <p class="title_text">test</p>
        <el-breadcrumb separator="/" class="crumb">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col class="search">
        <el-input
          placeholder="请输入搜索内容"
          v-model="search"
          type="input"
          clearable
          class="input"
          size="middle">
        </el-input>
        <el-button class="btn" type="primary" size="mini">查询</el-button>
      </el-col>
    <el-table
      :data="tableData3"
      highlight-current-row
      max-height="100%"
      style="width: 100%;border: 1px solid #e5e5e5;color:#333;margin-bottom: 20px;"
      v-loading="loading"
      >
      <el-table-column type="selection" width="55" header-align="center" >
      </el-table-column>
      <el-table-column prop="date" sortable label="日期" width="180" header-align="center">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180" header-align="center">
      </el-table-column>
      <el-table-column prop="address" label="地址" min-width="300" header-align="center">
      </el-table-column>
      <el-table-column label="操作" width="150" header-align="center">
          <template slot-scope="scope">
            <el-button size="small">编辑</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="100">
    </el-pagination>
  </section>
</template>

<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        tableData3: [],
        search: '',
        loading: true
      }
    },
    methods: {
      getRes: function(){
        // console.log(123)
        // let _this = this;
        axios.get('#').then((res)=>{
          let data = res.data.data;
          console.log(data);
          this.loading = false;
          let len = data.length;
          for(let i = 0; i<len; i++){
            let obj = {name: data[i].cityName, date: '2018-1-8', address: data[i].codeid}
            this.tableData3.push(obj);
          }
          // this.tableData3.push(arr);
          console.log(this.tableData3)
        }).catch(function(error){
            console.log(error)
        })
      }
    },
    mounted(){
      this.getRes();
    }
  }
</script>
<style scoped>
  .header{
    height: 50px;
    line-height: 50px;
    background-color: #25ff60
  }
  .row{
    height: 40px;
    line-height: 40px;
  }
  .title{
    height: 40px;
    line-height: 40px;
    display: flex;   
  }
  .title_text{
    width: 50%;
    margin: 0 0 0 20px;
    flex: 1;
    text-align: left;
    font-weight: bold;
  }
  .crumb{
    line-height: 40px;
    margin-right: 20px;
  }
  .search{
    width: 100%;
    background-color: #e5e5e5;
    margin-bottom: 10px;
    display: flex;
  }
  .input{
    width: 150px;
    margin: 10px 0 10px 10px;
  }
  .btn{
    height: 40px;
    margin: 10px 0 10px 10px;
  }
  tr>.current-row{
    background-color: #25ff30;
  }
  .el-table th>.cell{
    color:#333;
  }
</style>