const fs = require('fs');
const returnCode = require('./DataController')
//同步读取文件的形式
let Controller = async (ctx,next)=>{
	let db;
	db = fs.readFileSync('Json/user.json','utf8');
	await getUser(db).then((res)=>{
		ctx.body = returnCode(res);
	}).catch((err)=>{

	});
}

let getUser = async (db)=>{
	let data = JSON.parse(db);
	return new Promise((resolve,reject)=>{
		if(data.data.length>0){
			resolve(data.data);
		}else{
			reject({})
		}
	})
}

//异步读取文件的形式，目前有问题，暂时不知道怎么实现
// let Controller = async (ctx,next)=>{
// 	// let string = '111';
// 	let finish =  fs.readFile('Json/user.json', 'utf8', (err, data) => {
// 		return new Promise((resolve,reject)=>{
// 			if (err) {
// 				reject(err)
// 			}else{
// 				resolve(data)
// 			}
//
// 		})
// 	})
// 	finish.then((res)=>{
// 		console.log('res')
// 	}).catch((err)=>{
// 		console.log('err')
// 	})
// 	// ctx.body = string;
//
// }
// let finish = async ()=>{
// 	return await
// }
	//
	// string = data;
	// console.log('string', string);



module.exports = Controller;