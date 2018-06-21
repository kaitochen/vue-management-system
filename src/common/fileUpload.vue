<template>
    <el-col>
        <div style="width: 70px;height: 40px;position: relative;margin: 0 auto;">
            <input type="file" ref="upload" style="opacity: 0; width: 70px;height: 40px;position:absolute;top: 0;left: 0;z-index: 10">
            <el-button type="primary"  @click="chooseUpload">{{title}}</el-button>
        </div>
    </el-col>
</template>

<script>
	import * as qiniu from 'qiniu-js'
	export default{
		props: {
			finish: Function,
            title: String,
		},
		data (){
			return {
				token: '',
			}
		},
		methods:{
			upload(file){
				let observable;
				let finishedAttr = [];
				// eslint-disable-next-line
				let compareChunks = [];
				var config = {
					useCdnDomain: true,
					disableStatisticsReport: false,
					retryCount: 3,
				};
				var putExtra = {
					fname: "",
					params: {},
					mimeType: null
				};
				let key;
				if(file){
					key = file.name;

				}
				let error = (err)=>{
					console.log('error',err);
				}
				let complete = (res)=>{
					console.log('complete',res);
					this.finish(res);
				}
				let next = (res)=>{
					console.log('next',res);
					var chunks = res.chunks||[];
					// 这里对每个chunk更新进度，并记录已经更新好的避免重复更新，同时对未开始更新的跳过
					for (var i = 0; i < chunks.length; i++) {
						if (chunks[i].percent === 0 || finishedAttr[i]){
							continue;
						}
						if (compareChunks[i].percent === chunks[i].percent){
							continue;
						}
						if (chunks[i].percent === 100){
							finishedAttr[i] = true;
						}

					}
					compareChunks = chunks;
				}
				let subObject = {
					next: next,
					error: error,
					complete: complete
				}
				console.log(qiniu);
				observable = qiniu.upload(file,key,this.token,putExtra,config);
				observable.subscribe(subObject);
			},
			chooseUpload(){
				this.$refs.upload.change();
			}
		},
		mounted() {
			this.token = this.$store.state.token;
			let t = this;
			this.$refs.upload.addEventListener('change',function(){
				let file = this.files[0];
				t.upload(file)
			})
		}
	}


</script>

<style scoped>

</style>
