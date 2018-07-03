let domain = 'http://localhost:3330';

let API = {
	Login: {
		login_url: `${domain}/api/login/Login`,
	},
	List: {
		list_url: `${domain}/api/list/List`,
		addList_url: `${domain}/api/list/addList`,
		updateList_url: `${domain}/api/list/updateList/`,
		deleteList_url: `${domain}/api/list/deleteList/`,
	},
	Upload: {
		domain: 'http://cdn.qiniu.com/',
		upload_token: `${domain}/qiniu/token`,
	}

}

export default API;