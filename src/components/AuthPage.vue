<template>
	<section style="width: 100%;height: 100%;">
<!-- 		<el-col class="banner" :span="24">
			<p>权限管理</p>
		</el-col> -->
		<el-container style="width: 100%;height: 100%;">
			<el-header style="background-color: #e5e5e5;margin-bottom: 10px;text-align:left;">
				<p>权限管理</p>
			</el-header>
			<el-container>
				<el-aside width="200px" style="height: 100%;border: 1px solid #999;">
					<el-col style="width: 100%;margin: 15px 0 10px;">
						<router-link class="btn" to="/newUser">创建用户</router-link>
						<router-link class="btn" to="/newRole">创建角色</router-link>
					</el-col>
					<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" style="margin-top: 60px;"></el-tree>
				</el-aside>
				<el-main style="">
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</section>
</template>
<script>
	import router from 'vue-router';
	export default{
 	data() {
      	return {
        data: [{
          label: '超级管理员',
          children: [{
            label: 'admin',
            id: 0
          }]
        }, {
          label: '管理员',
          children: [{
            label: 'admin1',
            id: 1
          }, {
            label: 'admin2',
            id: 2
          }]
        }, {
          label: '客服',
          children: [{
            label: '思思',
            id: 3
          }, {
            label: '花花',
            id: 4
          }, {
            label: '艾米',
            id: 5
          }, {
            label: '彤彤',
            id: 6
          }]
        }, {
          label: '分析师',
          children: [{
            label: '黄飞鸿',
            id: 7
          }, {
            label: '鲲',
            id: 8
          }, {
            label: 'Jimmy',
            id: 9
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      handleNodeClick(data) {
      	// console.log(data.id)
      	if(data.id !== undefined){
        	this.$router.push({ path: '/authList/'+data.id})
      	}
      }
    }
	}
</script>
<style scoped>
	.banner{
		background-color: #e5e5e5;
		margin: 0 0 10px 0;
		text-align: left;
		padding-left: 20px; 
	}
	.btn{
		display: inline-block;
		background-color: #409EFF;
		width: 80px;
		height: 30px;
		text-decoration: none;
		color: #fff;
		font-size: 12px;
		text-align:center;
		line-height: 30px;
		border-radius: 5px;
		float: left;
		margin: 0 9px;
	}
</style>