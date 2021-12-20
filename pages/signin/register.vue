<template>
	<view>
		<view class="login">
			<view class="title">
				<text>注册</text>
			</view>
			<view class="line">
				<text style="width: 80rpx;text-align: center;">学号</text>
				<input type="text" placeholder="请输入学号" style="margin-left: 50rpx;" v-model="studentid"/>
			</view>
			<view class="line">
				<text style="width: 80rpx;text-align: center;">姓名</text>
				<input type="text" placeholder="请输入姓名" style="margin-left: 50rpx;" v-model="username"/>
			</view>
			<view class="line">
				<text style="width: 80rpx;text-align: center;">+86</text>
				<input type="text" placeholder="请输入手机号码" style="margin-left: 50rpx;" v-model="phonenumber" />
			</view>
			<view class="line">
				<text class="iconfont icon-mima" style="width: 80rpx;text-align:center;"></text>
				<input type="text" placeholder="请输入验证码" style="margin-left: 50rpx;width: 220rpx;" v-model="vercode"/>
				<text style="margin-left: 80rpx;border-left: solid 1px #C852AA;padding-left: 25rpx;padding-right: 25rpx;color: #C852AA;" v-if="showText==true" class="send" @click="getPin()">获取验证码</text>
				<text style="margin-left: 80rpx;border-left: solid 1px #C852AA;padding-left: 25rpx;padding-right: 25rpx;color: #C852AA;" v-else class="send">{{second}}s重新发送</text>
			</view>
			<view class="line">
				<text style="width: 80rpx;text-align: center;"></text>
				<input type="password" placeholder="密码" style="margin-left: 50rpx;width: 500rpx;" v-model="password"/>
			</view>
			<view class="line">
				<text style="width: 80rpx;text-align: center;"></text>
				<input type="password" placeholder="确认密码" style="margin-left: 50rpx; width:500rpx;" v-model="password2"/>
			</view>
			<button class="submit" @click="pretend()">注册</button>
		</view>
	</view>
</template>
	
<script>
	export default {
		data() {
			return {
				studentid:'',
				username:'',
				phonenumber:'',
				vercode:'',//输入的验证码
				password:'',
				password2:'',
				pin:'',//随机产生的验证码
				second:60,
				showText:true,
			}
		},
		methods: {
			//获取验证码
			getPin(){
				//先验证手机号
				if (!this.$validate.isPhone(this.phonenumber)) {
				  return uni.showToast( {icon: 'none', title: '请输入正确的手机号' })
				}
				//60s倒计时
				this.showText = false
				var interval = setInterval( ()=> {
				    let times = --this.second
				    this.second = times<10?'0'+times:times //小于10秒补0
				}, 1000)
				setTimeout(() => {
				    clearInterval(interval)
				    this.second=60
				    this.showText = true
				}, 60000)
				//生成6位随机数
				var num='';
				for(var i=0;i<6;i++){
					num+=Math.floor(Math.random()*10);
				}
				this.pin=num;
				//发送验证码到手机
				uniCloud.callFunction({
					name: 'sendMessage',
					data: { phone:this.phonenumber, code:this.pin },
					success(){
						console.log('验证码已发送')
					},
				})
			},
			pretend(){
				//校验规则
				let {studentid,username,phonenumber,vercode,password,password2} = this;
				let loginRules = [
					{name: 'studentid', required: true, type: 'stuno', errmsg: '请输入正确的学号'},
					{name: 'username', required: true, type: 'stuname', errmsg: '请输入姓名'},
					{name: 'phonenumber', required: true, type: 'phone', errmsg: '请输入正确的手机号'},
					{name: 'password', type: 'required', errmsg: '请输入密码'},
					{name: 'password', type: 'pwd', errmsg: '密码格式为6-12位，必须有大小写字母和数字组成'},
					{name: 'password2', type: 'eq', eqName: 'password', required: true, errmsg: '两次输入密码不一致'}
				]
				let valLoginRes = this.$validate.validate(this, loginRules)
				if(!valLoginRes.isOk){
					uni.showToast({
						icon: 'none',
						title: valLoginRes.errmsg
					})
				}
				else if(this.pin!==this.vercode){
					uni.showToast({
						icon: 'none',
						title: '验证码错误'
					})
				}
				else{
					uni.request({
						url: this.consturl+'/user/newuser',
						method: 'POST',
						data: { id:this.studentid,
								name:this.username,
								phone:this.phonenumber,
								password:this.password },
						success: res => {
							if(res.statusCode!== 201){
								uni.showToast({	icon: 'error', title: '注册失败'	})
							}
							else{
								uni.showToast({ icon: 'success', title: '注册成功' })
								uni.navigateTo({
									url: './pwdlogin',
								});
							}
						}
					})
				}
			}
		}
	}
</script>

<style>
	.line{
		display: flex;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		border-bottom: solid 1px #C852AA;
	}
	.icon-mima{
		line-height: 43rpx;
	}
	.title{
		font-size: 50rpx;
		font-weight: bold;
		margin-bottom: 30rpx;
	}
	.login{
		margin-top: 80rpx;
		margin-bottom: 50rpx;
		margin-left: 40rpx;
		margin-right: 40rpx;
	}
	.submit{
		border-radius: 50rpx;
		width: 600rpx;
		height: 100rpx;
		line-height: 100rpx;
		background-color:#C852AA;
		font-size: 40rpx;
		color: #FFFFFF;
		font-weight:bold;
		margin-top: 50rpx;
	}
	button::after{
		  border: 0;
	}
	.lastline{
		display: flex;
		justify-content: space-between;
		margin: 40rpx;
		color: #878887;
	}
</style>
