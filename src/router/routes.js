// import Vue from 'vue'
// import Router from 'vue-router'
import Login from '../screen/Login.vue'
import Main from '../screen/Main.vue'

import tutor from '../components/tutor.vue'
import teacher from '../components/teacher.vue'
import resume from '../components/resume.vue'
import release from '../components/release.vue'

import evaluateStu from '../components/evaluateStu.vue'
import evaluateTutor from '../components/evaluateTutor.vue'

import mess from '../components/mess.vue'
import list from '../components/list.vue'
import user from '../components/user.vue'

import service from '../components/service.vue'

import newTeacher from '../components/newTeacher.vue'
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
          path: 'tutor',
          name: 'tutor',
          component: tutor
        },{
          path: 'release',
          name: 'release',
          component: release
        },{
          path: 'teacher',
          name: 'teacher',
          component: teacher
        },{
          path: 'resume',
          name: 'resume',
          component: resume
        },{
          path: 'evaluateStu',
          name: 'evaluateStu',
          component: evaluateStu
        },{
          path: 'evaluateTutor',
          name: 'evaluateTutor',
          component: evaluateTutor
        },{
          path: 'service',
          name: 'service',
          component: service
        },{
          path: 'newTeacher',
          name: 'newTeacher',
          component: newTeacher
        },{
          path: 'list',
          name: 'list',
          component: list
        },{
          path: 'user',
          name: '用户列表',
          component: user
        }
      ]
    }
];
export default routes
