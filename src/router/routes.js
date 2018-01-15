// import Vue from 'vue'
// import Router from 'vue-router'
import Login from '../screen/Login.vue'
import Main from '../screen/Main.vue'

import HelloWorld from '../components/HelloWorld.vue'
import Table from '../components/Table.vue'
import Form from '../components/Form.vue'
import List from '../components/List.vue'
import Auth from '../components/Auth.vue'
import User from '../components/User.vue'
import Role from '../components/Role.vue'
import AuthList from '../components/AuthList.vue'
import newUser from '../components/newUser.vue'
import newRole from '../components/newRole.vue'
import newAuth from '../components/newAuth.vue'
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
      name: '',
      component: Main,
      children:[
        {
          path: '/hello',
          name: 'HelloWorld',
          component: HelloWorld
        },{
          path: '/table',
          name: 'table',
          component: Table
        },{
          path: '/form',
          name: 'form',
          component: Form
        },{
          path: '/table2',
          name: 'table2',
          component: Table
        },{
          path: '/list',
          name: 'list',
          component: List
        },{
          path: '/auth',
          name: 'auth',
          component: Auth
        },{
          path: '/user',
          name: 'user',
          component: User
        },{
          path: '/role',
          name: 'role',
          component: Role
        },{
          path: '/newUser',
          name: 'newUser',
          component: newUser,
        },{
          path: '/newRole',
          name: 'newRole',
          component: newRole,
        },{
          path: '/newAuth',
          name: 'newAuth',
          component: newAuth,
        }
      ]
    }
];
export default routes
