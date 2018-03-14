<template>
	<section>
		<el-row style="margin-bottom: 20px;">
			<el-col :span="2">
				<el-button size="small" @click="goBack">返回</el-button>
			</el-col>
		</el-row>
		<el-row class="item">
			<el-col  :span="7">
				<p class="title">标题：</p>
			</el-col>
			<el-col class="input" :span="10">
				<el-input v-model="title"></el-input>
			</el-col>
		</el-row>
		<el-row class="item">
			<el-col  :span="7">
				<p class="title">跳转链接：</p>
			</el-col>
			<el-col class="input" :span="10">
				<el-input v-model="link"></el-input>
			</el-col>
		</el-row>
		<el-row class="item">
			<el-col  :span="7">
				<p class="title">图片id：</p>
			</el-col>
			<el-col class="input" :span="10">
				<el-input v-model="imgId" disabled ></el-input>
			</el-col>
		</el-row>
		<el-row class="item">
			<div class="container">
	            <input type="hidden" id="domain" value="http://cdn.111.222.com/">
	            <input type="hidden" id="uptoken_url" value="http://dev.111.222.com//h5/v1/oos/qiniu/token">
	            <!-- http://gailun.ns002.com/h5/v1/oos/qiniu/token -->
	            <div id="container">
	            	<el-button type="primary">
		                <a class="file_btn" id="pickfiles" href="#" >
		                    <span>上传图片</span>
		                </a>
	            	</el-button>
	            </div>
	            <!-- <p class="fileName"></p> -->
	            <img :src="img" width="300px" style="margin-top: 20px;" v-show="show">
			</div>
		</el-row>

		<el-row class="item">
			<el-col  :span="7">
				<p class="title">序列：</p>
			</el-col>
			<el-col class="input" :span="10">
				<el-input  v-model="sort"></el-input>
			</el-col>
		</el-row>	
		
		<el-col :span="4" :offset="10">
			<el-button type="primary" style="width: 100%;margin-top: 50px;" @click="submit">提交</el-button>
		</el-col>
	</section>
</template>
<script>
	import axios from 'axios';
	import {Advert_API} from '../util.js';
	// import api from '../api.js';
	import "../jquery-3.2.1.min.js";
	import "../qiniu.js";
	import FileProgress from "../ui.js";
	// import "../upload.js";
	export default{
		data(){
			return{
				title: '',
				link: '',
				sort: '',
				img: '#',
				show: false,
				imgId: '',
				id: '',
				type: -1,
			}
		},
		methods: {
			submit(){
				if(this.type === 0){
					axios({
						url: Advert_API.create,
						method: 'put',
						data: {
							imgId: this.imgId,
							title: this.title,
							sort: this.sort,
							link: this.link,
						},
						headers: {
							'Authorization': 'Bearer '+sessionStorage.getItem('token'),
						}
					}).then((rsp)=>{
						let res = rsp.data;
						console.log(res);
						if(res.code === 200){
							this.$message({
								message: '添加成功',
								type: 'success',
								duration: 1000
							});
							this.$router.back();
						}else{
							this.$message({
								message: '添加失败',
								type: 'success',
								duration: 1000
							});
						}
					}).catch((err)=>{
						console.log(err);
					})
				}else if(this.type === 1){
					axios({
						url: Advert_API.update(this.id),
						method: 'post',
						data: {
							imgId: this.imgId,
							title: this.title,
							sort: this.sort,
							link: this.link,
						},
						headers: {
							'Authorization': 'Bearer '+sessionStorage.getItem('token'),
						}
					}).then((rsp)=>{
						let res = rsp.data;
						console.log(res);
						if(res.code === 200){
							this.$message({
								message: '修改成功',
								type: 'success',
								duration: 1000
							});
							this.$router.back();
						}else{
							this.$message({
								message: '修改失败',
								type: 'success',
								duration: 1000
							});
						}
					}).catch((err)=>{
						console.log(err);
					})
				}
				
			},
			goBack: function(){
				this.$router.back();
			},
			init: function(){
					let t = this;
				    var uploader = Qiniu.uploader({
			        disable_statistics_report: true,
			        makeLogFunc: 1,
			        runtimes: 'html5,flash,html4',
			        browse_button: 'pickfiles',
			        container: 'container',
			        drop_element: 'container',
			        max_file_size: '500mb',
			        dragdrop: true,
			        chunk_size: '4mb',
			        multi_selection: !(moxie.core.utils.Env.OS.toLowerCase()==="ios"),
			        unique_names: true,
			        max_retries: 3,                     // 上传失败最大重试次数
			        uptoken_func: function(){
			            var ajax = new XMLHttpRequest();
			            ajax.open('GET', $('#uptoken_url').val(), false);
			            ajax.setRequestHeader("If-Modified-Since", "0");
			            ajax.send();
			            if (ajax.status === 200) {
			                var res = JSON.parse(ajax.responseText);
			                console.log('custom uptoken_func:' + res.data.token);
			                return res.data.token;
			            } else {
			                console.log('custom uptoken_func err');
			                return '';
			            }
			        },
			        domain: $('#domain').val(),
			        get_new_uptoken: true,
			        auto_start: true,
			        log_level: 5,
			        init: {
			            'BeforeChunkUpload':function (up,file) {
			                console.log("before chunk upload:",file.name);
			            },
			            'FilesAdded': function(up, files) {
			                $('table').show();
			                $('#success').hide();
			                plupload.each(files, function(file) {
			                    console.log('filetype: ' + file.type);
			                        // isUpload =true;
			                        var progress = new FileProgress(file, 'fsUploadProgress');
			                        progress.setStatus("等待...");
			                        progress.bindUploadCancel(up);
			                });
			            },
			            'BeforeUpload': function(up, file) {
			                console.log("this is a beforeupload function from init");
			                var progress = new FileProgress(file, 'fsUploadProgress');
			                var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
			                if (up.runtime === 'html5' && chunk_size) {
			                    progress.setChunkProgess(chunk_size);
			                }
			            },
			            'UploadProgress': function(up, file) {
			                var progress = new FileProgress(file, 'fsUploadProgress');
			                var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
			                progress.setProgress(file.percent + "%", file.speed, chunk_size);
			            },
			            'UploadComplete': function() {
			                $('#success').show();
			            },
			            'FileUploaded': function(up, file, info) {
			                var res = JSON.parse(info.response);
			                console.log(res);
			                // $('.fileName').text(res.data.fileName)
			                t.img = res.data.link;
			                t.imgId = res.data.id;
			                t.show = true;
			            },
			            'Error': function(up, err, errTip) {
			                $('table').show();
			                var progress = new FileProgress(err.file, 'fsUploadProgress');
			                progress.setError();
			                progress.setStatus(errTip);
			            }
			        }
			    });
			},
			setUpdate(obj){
				this.imgId = obj.imgId;
				this.title = obj.title;
				this.sort = obj.sort;
				this.link = obj.link;
				this.id = obj.id;
			}
		},
		mounted(){
			this.init();
			// console.log(this.$route.params.id === undefined)
			if(this.$route.params.id === undefined){
				this.type = 0;
			}else{
				// console.log('update')
				this.type = 1;
				this.setUpdate(this.$route.params);

			}

		}
	}
</script>
<style scoped>
	.item{
		margin-bottom: 10px;
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
	.file_btn{
		display: block;
		text-decoration: none;
		color: #fff
	}
</style>