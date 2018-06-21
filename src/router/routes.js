import Login from '../screen/Login.vue'
import Main from '../screen/Main.vue'

import mess from '../components/mess.vue'
import list from '../components/list.vue'
import List2 from '../components/List2.vue'
import Upload from '../components/Upload.vue'


let routes = [
	{
		path: '/login',
		name: '',
		component: Login,
	}, {
		path: '/',
		name: '',
		component: Main,
		children: [
			{
				path: '',
				name: '',
				components:{
					'/home': mess,
					'/example1_1': list,
					'/example1_2': List2,
					'/example2_1': Upload,
				}
			}
		]
	}
];
export default routes;

