'use strict';
exports.main = async (event, context) => {
	const res = await uniCloud.sendSms({
		appid: "__UNI__13512FC",
		smsKey:'12b6a0497196d9812bd55a3db0b3e950',
		smsSecret:'909a1214397d0c62d9f2e369bc6ce4cb',
		phone:event.phone,
		templateId:'13388',
		data:{
			code:event.code,
			expMinute:'1'
		},
	})
	return res
};
