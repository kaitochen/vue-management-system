const fs = require('fs');
const CheckTokenController = require('../common/CheckTokenController');

let CheckUserController = async (ctx,next)=>{
	let DB ;
	let rq = ctx.request.query;
	let check = true;
	// await CheckTokenController(ctx.request.header).then((res)=>{
	// 	check = res;
	// }).catch((err)=>{
	// 	check = err;
	// })
	if(check){
		DB = fs.readFileSync('Json/list.json','utf8');
		// console.log(DB)
		await getList(rq,JSON.parse(DB)).then((res)=>{
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
			code: 400,
			msg: '授权过期'
		})
	}


}

let getList = async (params,database)=>{
	let data = database.list;
	let size = params.pageSize;
	let index = params.pageIndex;
	// console.log(database)
	let result = [];
	let error = '';
	try{
		if(data.length<=(index-1)*size){

		}else{
			result = data.slice((index-1)*size,index*size);
		}
	}catch(err){
		error = err;
	}

	return new Promise((resolve,reject)=>{
		if(error!==''){
			reject(err)
		}else{
			resolve(result)
		}
	})
	// console.log(result)
}


module.exports = CheckUserController;

