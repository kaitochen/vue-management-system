
let test = async (ctx,next)=>{
	let a = '';
	await getName(ctx).then((res)=>{
		console.log('url:',res);
		a = res;
	});
	ctx.body = a;
}

let getName = async (ctx)=>{
	return ctx.request.url;
}

module.exports = test;