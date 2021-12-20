const BASE_URL = "http://192.168.1.105:9091"//这里修改后端地址
export const myRequest = (options) => {
	return new Promise((resolve,reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || "GET",
			data: options.data || {},
			success: (res) => {
				//console.log("status:" + res.data.status);
				if(res.data.staCode != 1){//后端定义一个staCode表示数据是否能被获取
					return uni.showToast({
						title:"获取数据失败",
						icon:"error"
					})
				}
				resolve(res);
			},
			fail: (err) => {
				uni.showToast({
					title:"请求接口失败"
				});
				reject(err);
			}
		})
	})
}

//使用方式
// async getData(){
// 	const res = await this.$myRequest({
// 		url:'/user'
// 	})
// 	console.log(res);
// }
