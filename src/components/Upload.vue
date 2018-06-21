<template>
    <section>
        <el-row class="item">
            <el-col :span="4" :offset="6">
                <p class="title">课程Id：</p>
            </el-col>
            <el-col class="input" :span="5">
                <el-input v-model="id" disabled></el-input>
            </el-col>
        </el-row>
        <el-row class="item">
            <el-col :span="4" :offset="6">
                <p class="title">课程名称：</p>
            </el-col>
            <el-col class="input" :span="5">
                <el-input v-model="eduContent"></el-input>
            </el-col>
        </el-row>
        <el-row class="item">
            <el-col :span="4" :offset="6">
                <p class="title">教学地址：</p>
            </el-col>
            <el-col class="input" :span="5">
                <el-input v-model="eduAddress"></el-input>
            </el-col>
        </el-row>
        <el-row class="item">
            <el-col :span="4" :offset="6">
                <p class="title">价格：</p>
            </el-col>
            <el-col class="input" :span="5">
                <el-input v-model="price"></el-input>
            </el-col>
        </el-row>
        <el-row class="item" v-loading="loading">
            <img :src="codeImg" width="150px" style="margin-top: 20px;" v-show="show">
            <UploadBtn :finish="uploadFinish" title="选择"></UploadBtn>
        </el-row>
        <el-col :span="4" :offset="10">
            <el-button type="primary" style="width: 100%;margin-top: 50px;" @click="submit">提交</el-button>
        </el-col>
    </section>
</template>

<script>

	export default{
		props: ['params'],
		data (){
			return {
				id: '',
				eduContent: '',
				eduAddress: '',
				codeImg: '',
				price: '',
                data: '',
				loading: false,
				show: false,
			}
		},
		methods:{
			submit() {

			},
            uploadFinish(res){
                if(res.code === 200){
			    	this.codeImg = res.data.link;
			    	this.show = true;
                }
            },
			setUpdate(obj){
				this.id = obj.id;
				this.eduContent = obj.eduContent;
				this.eduAddress = obj.eduAddress;
				this.price = obj.price;
				this.data = obj;
			},
		},
		mounted() {
			if (this.params.id === undefined) {
				this.type = 0;
			} else {
				this.type = 1;
				this.setUpdate(this.params);
			}
		}
	}


</script>

<style scoped>
    .item {
        margin-bottom: 10px;
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

    .file_btn {
        display: block;
        text-decoration: none;
        color: #fff
    }
</style>
