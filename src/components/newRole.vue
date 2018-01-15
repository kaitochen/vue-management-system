<template>
	<section :span="24">
		<el-row :span="20" :offset="2" class="item">
			<el-col :span="5" :offset="2">
				<p class="title">角色名：</p>
			</el-col>
			<el-col class="input" :span="10">
				<el-input v-model="name"></el-input>
			</el-col>
		</el-row>
		<el-row :span="20" :offset="2" class="item">
			<el-col  :span="5" :offset="2">
				<p class="title">权限：</p>
			</el-col>
			<el-col  class="type" :span="10">
				<template v-for="item in checkRole">
					<el-tag style="margin: 0 5px 5px 0">{{item.label}}</el-tag>
				</template>	
			</el-col>
			<el-col class="btn" :span="5">
				<el-button type="primary" size="small"  @click="dialogFormVisible = true">增加</el-button>
			</el-col>
		</el-row>
		<el-col :span="6" :offset="9">
			<el-button type="primary" style="width: 100%;margin-top: 50px;" >保存</el-button>
		</el-col>
		<el-dialog title="权限控制" width="800px" :visible.sync="dialogFormVisible">
			<el-transfer v-model="roleIndex" :data="role"></el-transfer>	
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="setAuth">确 定</el-button>
			</div>
		</el-dialog>
	</section>
</template>
<script>
	export default{
		data(){
			const generateData = _ => {
	        const data = [];
	        for (let i = 1; i <= 15; i++) {
				data.push({
					key: i,
					label: `备选项 ${ i }`
				});
			}
				return data;
			};
			return{
				name: '',
				// password: 123456,
				// nameState: true,
				// pawState: true,
				dialogFormVisible: false,
				data: generateData(),
        		checkRole: [],
        		role: [
        				{key:1,label:'发布信息1'},
        				{key:2,label:'数据统计2'},
        				{key:3,label:'发布策略3'},
        				{key:4,label:'修改用户4'},
        				{key:5,label:'查看注册5'},
        				{key:6,label:'发布信息6'},
        				{key:7,label:'数据统计7'},
        				{key:8,label:'发布策略8'},
        				{key:9,label:'修改用户9'},
        				{key:10,label:'查看注册10'},
        				{key:11,label:'发布信息11'},
        				{key:12,label:'数据统计12'},
        				{key:13,label:'发布策略13'},
        				{key:14,label:'修改用户14'},
        				{key:15,label:'查看注册15'}
					],
				roleIndex: [],
			}
		},
		methods: {
			setState: function(){
				this.pawState = !this.pawState;
			},
			setAuth: function(){
				let arr = [];
				this.roleIndex.map((i)=>{
					arr.push(this.role[i-1]);
				})
				this.checkRole = arr;
				this.dialogFormVisible = false;
			}
		}
	}
</script>
<style scoped>
	.item{
		margin-bottom: 10px;
		/*background-color: #999;*/
		/*border-bottom: 1px solid #e5e5e5;*/
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
		text-align: left;
		margin-left: 10px;
	}
</style>
