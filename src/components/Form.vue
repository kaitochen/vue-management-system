<template>
	<section class="page">
		<el-col class="item">
			<el-radio-group v-model="radio">
				<el-radio class="radio" :label="3">备选项</el-radio>
				<el-radio class="radio" :label="6">备选项</el-radio>
				<el-radio class="radio" :label="9">备选项</el-radio>
			</el-radio-group>
		</el-col>		
		<el-col class="item">
			<el-radio-group v-model="radio2">
				<el-radio class="radio2" border :label="3">备选项</el-radio>
				<el-radio class="radio2" border :label="6">备选项</el-radio>
				<el-radio class="radio2" border :label="9">备选项</el-radio>
			</el-radio-group>
		</el-col>
		<el-col class="item">
			<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
			<div style="margin: 15px 0;"></div>
			<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
					<el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
			</el-checkbox-group>
		</el-col>
		<el-col class="item">
			测试：<el-input 
				class="input"
			  	placeholder="请输入内容"
			  	v-model="input"
			  	type="text"
			  	clearable>
			</el-input>
		</el-col>
		<el-col class="item">
			测试：<el-input
			  type="textarea"
			  :rows="2"
			  placeholder="请输入内容"
			  class="input">
			</el-input>
		</el-col>
		<el-col class="item">
			<el-select v-model="select" clearable placeholder="请选择">
			    <el-option
			      v-for="item in options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select>
		</el-col>
		<el-col class="item">
			<el-rate style="outline: none"
			    v-model="star"
			    :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
			</el-rate>
		</el-col>
	</section>
</template>

<script>
	const cityOptions = ['上海', '北京', '广州', '深圳'];
	export default{
		data(){
			return{
				radio: 3,
				radio2: 6,
				checkAll: false,
		        checkedCities: [],
		        cities: cityOptions,
		        isIndeterminate: true,
		        input: '',
		        options: [{
		          value: '选项1',
		          label: '黄金糕'
		        }, {
		          value: '选项2',
		          label: '双皮奶'
		        }, {
		          value: '选项3',
		          label: '蚵仔煎'
		        }, {
		          value: '选项4',
		          label: '龙须面'
		        }, {
		          value: '选项5',
		          label: '北京烤鸭'
		        }],
		        select: '',
		        star: null
			}
		},
		 methods: {
			handleCheckAllChange(val) {
			this.checkedCities = val ? cityOptions : [];
			this.isIndeterminate = false;
			},
			handleCheckedCitiesChange(value) {
			let checkedCount = value.length;
			this.checkAll = checkedCount === this.cities.length;
			this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
			}
		}
	}
</script>
<style scoped>
	.page{
		width: 100%;
		height: 100%;
		border: 2px solid #e5e5e5;
		box-sizing: border-box;
		background-color: #fff;
	}
	.item{
		/*width: 60%;*/
		margin: 0 0 20px;
		/*text-align: left;*/
	}
	.radio{
		height: 40px;
		line-height: 40px;
		/*margin: 0 10px;*/
	}
	.input{
		width: 50%;
	}
</style>