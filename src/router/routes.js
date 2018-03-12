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
      name: '',
      component: Main,
      children:[
        {
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
        }
      ]
    }
];
export default routes
