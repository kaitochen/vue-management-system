<template>
    <section class="bg">
        <el-form class="login-form">
            <h3 class="icon">后台管理系统</h3>
            <el-form-item>
                <el-input prefix-icon="el-icon-edit" type="text" v-model="name" auto-complete="off"
                          placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input prefix-icon="el-icon-edit" type="password" v-model="password" auto-complete="off"
                          placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="btn" @click.native.prevent="submit">登录</el-button>
            </el-form-item>
        </el-form>

    </section>
</template>
<script>
	export default {
		data() {
			return {
				name: '',
				password: '',
			}
		},
		methods: {
			submit() {
				//登录调用
                /*这里做具体的登录业务和登陆后的数据处理*/
				this.axios.post(this.API.Login.login_url, {username: this.name, password: this.password}).then((rsp) => {
					let res = rsp.data;
					if (res.code === 200) {
						sessionStorage.setItem('token', res.data.token);
						sessionStorage.setItem('name', this.name);
						this.$router.push({
							path: '/'
						})
					} else {
						this.$message({
							message: res.msg,
							type: 'error',
							duration: 2000
						});
					}
				}).catch(function (error) {
					console.log(error)
				})
			}
		}
	}
</script>
<style scoped>
    .bg {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        bottom: 0px;
        background-color: #e4edec;
    }
    .login-form {
        width: 450px;
        margin: 200px auto 0;
        box-sizing: border-box;
        padding: 50px;
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.2);
    }
    .btn {
        width: 100%;
        margin: 20px auto 0;
    }
</style>
