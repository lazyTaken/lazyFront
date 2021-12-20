'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('hello')
	console.log(event.phone)
	//返回数据给客户端
	let data={return:"yyds"}
	return data
};
