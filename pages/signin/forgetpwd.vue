<template>
	<view>
		<view class="login">
			<view class="title">
				<text>重置密码</text>
			</view>
			<!-- 手机号码 -->
			<view class="line">
				<text style="width: 80rpx;text-align: center;">+86</text>
				<input type="text" placeholder="请输入手机号码" style="margin-left: 50rpx;" v-model="phonenumber"/>
			</view>
			<!-- 验证码 -->
			<view class="line">
				<text class="iconfont icon-mima" style="width: 80rpx;text-align: center;"></text>
				<input type="text" placeholder="请输入验证码" style="margin-left: 50rpx;width: 220rpx;" v-model="vercode"/>
				<text style="margin-left: 100rpx;border-left: solid 1px #C852AA;padding-left: 25rpx;padding-right: 25rpx;color: #C852AA;" v-if="showText==true" class="send" @click="getPin()">获取验证码</text>
				<text style="margin-left: 100rpx;border-left: solid 1px #C852AA;padding-left: 25rpx;padding-right: 25rpx;color: #C852AA;" v-else class="send">{{second}}s重新发送</text>
			</view>
			<!-- 密码 -->
			<view class="line">
				<text style="width: 80rpx;text-align: center;"></text>
				<input type="password" placeholder="新密码" style="margin-left: 50rpx;width: 500rpx;" v-model="newpassword"/>
			</view>
			<view class="line">
				<text style="width: 80rpx;text-align: center;"></text>
				<input type="password" placeholder="确认新密码" style="margin-left: 50rpx;width: 500rpx;" v-model="connewpwd"/>
			</view>
			<button class="submit" @click="submit()">确认</button>
		</view>
	</view>
</template>
	
<script>
	export default {
		data() {
			return {
				phonenumber:'',
				vercode:'',
				newpassword:'',
				connewpwd:'',
				second:60,
				showText:true,
				pin:'',
			}
		},
		methods: {
			getPin(){
				//先检验手机号
				if (!this.$validate.isPhone(this.phonenumber)) {
				  return uni.showToast( {icon: 'none', title: '请输入正确的手机号'} )
				}
				this.showText = false
				var interval = setInterval(() => {
				    let times = --this.second
				    this.second = times<10?'0'+times:times
				}, 1000)
				setTimeout( ()=> {
				    clearInterval(interval);
				    this.second=60;
				    this.showText = true;
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
			submit(){
				let {phonenumber,vercode,newpassword,connewpwd} = this;
				let loginRules = [
					{name: 'newpassword', type: 'required', errmsg: '请输入密码'},
					{name: 'newpassword', type: 'pwd', errmsg: '密码格式为6-12位，必须有大小写字母和数字组成'},
					{name: 'connewpwd', type: 'eq', eqName: 'newpassword', required: true, errmsg: '两次输入密码不一致'}
				]
				let valLoginRes = this.$validate.validate(this, loginRules)
				if (!valLoginRes.isOk) {
					uni.showToast({
						icon: 'none',
						title: valLoginRes.errmsg
					})
				}
				//判断验证码
				else if(this.pin!==this.vercode){
					uni.showToast({
						icon: 'none',
						title: '验证码错误'
					})
				}
				else{
					uni.request({
						url: this.consturl+'/user/password',
						method: 'POST',
						data: { phone:this.phonenumber,
								password:this.newpassword },
						success: (res) => {
							if(res.statusCode !== 200){
								return uni.showToast( {icon: 'error', title: '重置失败'} )
							}
							uni.showToast({	title: '重置成功' })
							uni.redirectTo({
								url: './pwdlogin',
							})
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
