let domain = 'http://test.com';

let API = {
	Login: {
		login_url: `${domain}/login`,
	},
	Upload: {
		domain: 'http://cdn.qiniu.com/',
		upload_token: `${domain}/qiniu/token`,
	}

}

export default API;