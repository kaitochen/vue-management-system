const fs = require('fs');

let CheckUserController = async (ctx,next)=>{
	let DB ;
	let rq = ctx.request.body;
	// console.log('body',rq);
	DB = fs.readFileSync('Json/user.json','utf8');
	// console.log()
	await checkByNamePsw(rq,JSON.parse(DB)).then((res)=>{
		ctx.body = JSON.stringify({
			code: 200,
			data: res
		})
	}).catch((err)=>{
		ctx.body = JSON.stringify({
			code: 200,
			msg: err
		})
	})

}

let checkByNamePsw = (params,database)=>{
	let data = database.data;
	let name = params.name;
	let psw = params.password;
	// console.log(database)
	let user = data[name];
	let result,msg;

	if(user!==undefined){
		if(user.name === name){
			if(user.password === psw){
				result = 1;
			}else{
				result = -1;
				msg = '密码错误';
			}
		}else{
			result = -1;
			msg = '用户名错误'
		}

	}else{
		result = -1;
		msg = '该用户还未注册'
	}
	return new Promise((resolve,reject)=>{
		if(result<0){
			reject(msg)
		}else{
			resolve(params)
		}
	})

	// console.log(result)
}

module.exports = CheckUserController;

