const stunum=/[0-9]{12}/
const stuname= /[\u4e00-\u9fa5_a-zA-Z0-9_]{2,10}/
const phoneReg = /^1[0-9]{10,10}$/
const pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
export default {
	// 验证手机号
	isPhone: function(val) {
		return phoneReg.test(val)
	},
	validate: function(data, rules) {
		let res = { isOk: true, errmsg: '' }
		if (!rules || !rules.length) {
			return res
		}
		for (let rule of rules) {
			if (!rule || !rule.name || !rule.type) {
				continue
			}
			// required判断
			if (!data[rule.name]) {
				if (rule.type === 'required' || rule.required) {
					res = { isOk: false, errmsg: rule.errmsg }
					if (!res.errmsg) {
						res.errmsg = '请正确输入所有数据' //默认提示
					}
					return res
				}
				continue //不是必填项就跳过
			}
			switch (rule.type) {
				case 'stuno':
				if (!stunum.test(data[rule.name])) {
						res = { isOk: false, errmsg: rule.errmsg }
					}
				break
				case 'stuname':
				if (!stuname.test(data[rule.name])) {
						res = { isOk: false, errmsg: rule.errmsg }
					}
				break
				case 'phone':
					if (!phoneReg.test(data[rule.name])) {
						res = { isOk: false, errmsg: rule.errmsg }
					}
				break
				case 'pwd':
					if (!pwdReg.test(data[rule.name])) {
						res = { isOk: false, errmsg: rule.errmsg }
					}
				break
				case 'eq':
					if (data[rule.name] !== data[rule.eqName]) {
						res = { isOk: false, errmsg: rule.errmsg }
					}
				break
			}
			// 发现任何一个错误就立即返回，后面的不再判断
			if (!res.isOk) {
				if (!res.errmsg) {
					res.errmsg = '请正确输入所有数据' //默认提示
				}
				return res
			}
		}
		return res
	}
}