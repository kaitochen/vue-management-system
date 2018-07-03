const fs = require('fs');
const CheckTokenController = require('../common/CheckTokenController');

let updateListController = async (ctx,next)=>{
	let DB ;
	let reqData = ctx.request.body;
	let check = true;
	// console.log();
	let url = ctx.request.url;
	let index = url.lastIndexOf('/');
	let id = 0;
	if(index>0){
		id = url.slice(index+1);
	}
	// console.log(id);
	// await CheckTokenController(ctx.request.header).then((res)=>{
	// 	check = res;
	// }).catch((err)=>{
	// 	check = err;
	// })
	if(check){
		DB = fs.readFileSync('Json/list.json','utf8');
		// console.log(DB)
		await updateList(reqData,id,JSON.parse(DB)).then((res)=>{
			ctx.body = JSON.stringify({
				code: 200,
				data: res
			})
		}).catch((err)=>{
			ctx.body = JSON.stringify({
				code: 400,
				msg: err
			})
		})
	}else{
		ctx.body = JSON.stringify({
			code: 401,
			msg: '授权过期'
		})
	}
}

let updateList = async (params,id,database)=>{
	let error;
	try{
		let data = database.list;
		// console.log(data);
		let len = data.length;
		let obj = {};
		let index = -1;
		for(let i=0;i<len;i++){
			if(data[i].id == id){
				obj = data[i];
				index = i;
			}else{

			}
		}
		console.log(obj);
		if(params.name!==undefined){
			obj.name = params.name;
		}
		if(params.address !== undefined){
			obj.address = params.address
		}
		if(params.content !== undefined){
			obj.content = params.content
		}
		data[index] = obj;
		database.list = data;
		fs.writeFile('Json/list.json',JSON.stringify(database),'utf8');
	}
	catch(err){
		error = err;
	}

	return new Promise((resolve,reject)=>{
		if(error){
			reject(error)
		}else{
			resolve('添加成功')
		}
	})
}


module.exports = updateListController;

