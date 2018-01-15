<template>
	<section :span="24">
		<el-row :span="20" :offset="2" class="item">
			<el-col :span="5">
				<p class="title">名称：</p>
			</el-col>
			<el-col class="input" :span="14">
				<el-input v-model="name"></el-input>
			</el-col>
		</el-row>
		<el-row :span="20" :offset="2" class="item">
			<el-col  :span="5">
				<p class="title">key：</p>
			</el-col>
			<el-col class="input" :span="14">
				<el-input v-model="key"></el-input>
			</el-col>
		</el-row>
		<el-row :span="20" :offset="2" class="item">
			<el-col  :span="5">
				<p class="title">value：</p>
			</el-col>
			<el-col class="input" :span="14">
				<el-input v-model="value"></el-input>
			</el-col>
		</el-row>
		<el-row :span="20" :offset="2" class="item">
			<el-col  :span="5">
				<p class="title">描述：</p>
			</el-col>
			<el-col class="input" :span="14">
				<el-input v-model="password"></el-input>
			</el-col>
		</el-row>
		<el-col :span="4" :offset="10">
			<el-button type="primary" size="medium" style="width:100%;margin-top: 50px">提交</el-button>
		</el-col>
	</section>
</template>
<script>
	export default{
		data(){
			return{
				name: '',
				password: '',				
				key: '',
				value: '',
        		
			}
		},
		methods: {
			setState: function(){
				this.pawState = !this.pawState;
			},
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
	}
</style>