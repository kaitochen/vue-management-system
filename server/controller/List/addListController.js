const fs = require('fs');
const CheckTokenController = require('../common/CheckTokenController');

let addListController = async (ctx,next)=>{
	let DB ;
	let reqData = ctx.request.body;
	let check = true;
	// console.log(rq);
	// await CheckTokenController(ctx.request.header).then((res)=>{
	// 	check = res;
	// }).catch((err)=>{
	// 	check = err;
	// })
	if(check){
		DB = fs.readFileSync('Json/list.json','utf8');
		// console.log(DB)
		await addList(reqData,JSON.parse(DB)).then((res)=>{
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

let addList = async (params,database)=>{
	let error;
	try{
		let data = database.list;
		if(params.name===undefined){
			throw '参数不完整';
		}
		if(params.address === undefined){
			throw '参数不完整'
		}
		if(params.content === undefined){
			throw '参数不完整'
		}
		let len = data.length;
		let date = new Date();
		let time = setTime(date);
		let obj = {
			id: data[len-1].id+1,
			name: params.name,
			content: params.content,
			address: params.address,
			createTime: time
		}
		data.push(obj);
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

const setTime = (date)=>{
	let year = date.getFullYear();
	let month = date.getMonth()+1;
	if(month<10){
		month = '0'+month;
	};
	let day = date.getDate();
	if(day<10){
		day = '0'+day;
	}
	let hours = date.getHours();
	hours = hours<10?'0'+hours:hours;
	let minutes = date.getMinutes();
	minutes = minutes<10?'0'+minutes:minutes;
	let seconds = date.getSeconds();
	seconds = seconds<10?'0'+seconds:seconds;

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

module.exports = addListController;

