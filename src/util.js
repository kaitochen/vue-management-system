let url = 'http://';
 
export const API = {
	login: url+'/admin/v1/login',
	role: url+'/admin/access/v1/function/role',
}

export let Function_API = {
	list: url+"/admin/access/v1/function/list",
	roles: url+"/admin/access/v1/function/roles",
	save: url+"/admin/access/v1/function",
}

export let User_API = {
	add_user: url+"/admin/access/v1/sys-user",
	user_list: url+"/admin/access/v1/sys-user/list",
	delete_user: (id)=>{
		return url+"/admin/access/v1/sys-user/"+id
	},//+id
	update_user: (id)=>{
		return url+"/admin/access/v1/sys-user/"+id
	},//+id
	update_psw: (id)=>{
		return	url+"/admin/access/v1/sys-user/"+id+"/password"
	}, 
}

export let Mall_API = {
	goods_list: url+"/admin/access/v1/integral-mall/ticket/goods/list",
	add_goods: url+"/admin/access/v1/integral-mall/ticket/goods",
	update_goods: (id)=>{
		return url+"/admin/access/v1/integral-mall/ticket/goods/"+id;
	},
	delete_goods: (id)=>{
		return url+"/admin/access/v1/integral-mall/ticket/goods/"+id;
	},
	exchange_log: url+"/admin/access/v1/integral-mall/ticket/exchange/log",
	checkList: (status)=>{
		return url+"/admin/access/v1/integral-mall/ticket/check/list/status/"+status;
	},
	check_ticket: url+"/admin/access/v1/integral-mall/ticket/check",
}

export let Advert_API = {
	list: url+"/admin/access/v1/advert/banner/list",
	create: url+"/admin/access/v1/advert/banner",
	update: (id)=>{
		return url+"/admin/access/v1/advert/banner/"+id;
	},
}

export let  AppUser_API = {
	list: url+"/admin/access/v1/user",
	mute_user: (id,type)=>{
		return `${url}/admin/access/access/v1/user/mute/${id}/${type}`
	},
	forbidden_user: (id,type)=>{
		return `${url}/admin/access/access/v1/user/forbidden/${id}/${type}`
	}
}

export let Live_API = {
	mute_list: url+"/admin/access/v1/live/mute/list",
	mute: (phone,type)=>{
		return `${url}/admin/access/v1/live/mute/${phone}/${type}`
	}
}

export let ticket_API = {
	list: (status)=>{
		return `${url}/admin/access/v1/integral-mall/ticket/check/list/status/${status}`
	},
	check: url+"/admin/access/v1/integral-mall/ticket/check",
	exchange_log: url+"/admin/access/v1/integral-mall/ticket/exchange/log"
}

export let goods_API = {
	list: url+"/admin/access/v1/integral-mall/ticket/goods/list",
	add_goods: url+"/admin/access/v1/integral-mall/ticket/goods",
	delete_goods: (id)=>{
		return `${url}/admin/access/v1/integral-mall/ticket/goods/${id}`
	},
	update_goods: (id)=>{
		return `${url}/admin/access/v1/integral-mall/ticket/goods/${id}`
	}
}



