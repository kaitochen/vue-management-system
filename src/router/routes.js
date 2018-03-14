// import Vue from 'vue'
// import Router from 'vue-router'
import Login from '../screen/Login.vue'
import Main from '../screen/Main.vue'


import mess from '../components/mess.vue'
import list from '../components/list.vue'
import user from '../components/user.vue'
import addUser from '../components/addUser.vue'
import advert from '../components/advert.vue'
import addAdvert from '../components/addAdvert.vue'
import live from '../components/live.vue'
import goods from '../components/goods.vue'
// Vue.use(Router)

let routes = [
    {
    	path: '/login',
    	name: '',
    	component: Login,
    	// hidden: true
    },
    {
      path: '/',
      name: '首页',
      component: Main,
      children:[
        {
          path: '',
          name: '',
          component: mess
        },{
          path: 'list',
          name: 'list',
          component: list
        },{
          path: 'user',
          name: '用户列表',
          component: user
        },{
          path: 'addUser',
          name: '增加用户',
          component: addUser
        },{
          path: 'advert',
          name: 'banner列表',
          component: advert
        },{
          path: 'addAdvert',
          name: '增加banner',
          component: addAdvert
        },{
          path: 'updateAdvert/:params',
          name: '修改banner',
          component: addAdvert
        },{
          path: 'live',
          name: '禁言列表',
          component: live
        },{
          path: 'goods',
          name: '券商品列表',
          component: goods
        }
      ]
    }
];
export default routes
