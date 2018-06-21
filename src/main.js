// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Router from 'vue-router'
import routes from './router/routes'
import './custom.css'
import Vuex from 'vuex'
import axios from 'axios'
import API from './util/util'
import FileUpload from './common/fileUpload.vue'

Vue.use(ElementUI)
Vue.use(Router)
Vue.use(Vuex)
Vue.component('UploadBtn',FileUpload);

const router = new Router({
	routes
})
router.beforeEach((to,from,next)=>{

	if (to.path === '/login') {
		sessionStorage.removeItem('token');
	}
	let user = sessionStorage.getItem('token');
	if (!user && to.path !== '/login') {
		next({path: '/login'})
	} else {
		next()
	}
})
const store = new Vuex.Store({
	state: {
		token: ''
	},
	mutations: {
		set(state,val){
			state.token = val;
		},
	}
})

Vue.prototype.axios = axios;
Vue.prototype.API = API;
Vue.prototype.$eventHub= Vue.prototype.$eventHub || new Vue();
Vue.prototype.$store = store;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
