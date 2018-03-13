// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Router from 'vue-router'
import routes from './router/routes'

Vue.use(ElementUI)
Vue.use(Router)

const router = new Router({
	routes
})
router.beforeEach((to,from,next)=>{ 

  if (to.path == '/login') {
    sessionStorage.removeItem('lg');
  }
  let user = sessionStorage.getItem('token');
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})
new Vue({
  // el: '#app',
  router,
  // template: '<App/>',
  // components: { App },
  render: h => h(App)
}).$mount('#app')
