let url = '';
 
let API = {
	login: url+'/admin/v1/login',
	role: url+'/admin/access/v1/function/role',
	user: url+"/admin/access/v1/sys-user/list",
	list: url+"/admin/access/v1/function/list",
}

export default API;
