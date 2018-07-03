
let CheckTokenController = async (header)=>{
	let checkAuth = false;
	if(header.authorization!==undefined){
		let authorization = header.authorization;
		console.log('toekn',authorization);
		console.log('auth',global.auth);
		if(authorization === global.auth){
			checkAuth = true;
		}else{
			checkAuth = false;
		}
	}else{
		checkAuth = false;
	}

	return new Promise((resolve,reject)=>{
		if(checkAuth){
			resolve(true)
		}else{
			reject(false)
		}
	})
}

module.exports = CheckTokenController;