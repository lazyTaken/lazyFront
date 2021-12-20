<template>
	<view>
		<view class="login">
			<view class="title">
				<text>验证码登录</text>
			</view>
			<view class="line">
				<text style="width: 80rpx;text-align: center;">+86</text>
				<input type="text" placeholder="请输入手机号码" style="margin-left: 50rpx;" v-model="phonenumber"/>
			</view>
			<view class="line">
				<text class="iconfont icon-mima" style="width: 80rpx;text-align: center;"></text>
				<input type="text" placeholder="请输入验证码" style="margin-left: 50rpx;width: 220rpx;" v-model="vercode"/>
				<text style="margin-left: 80rpx;border-left: solid 1px #C852AA;padding-left: 25rpx;padding-right: 25rpx;color: #C852AA;" v-if="showText==true" class="send"@click="getPin()">获取验证码</text>
				<text style="margin-left: 80rpx;border-left: solid 1px #C852AA;padding-left: 25rpx;padding-right: 25rpx;color: #C852AA;" v-else class="send">{{second}}s重新发送</text>
			</view>
			<button class="submit" @click="submit()">登录</button>
			<view class="lastline">
				<view>
					<text @click="toPwdlogin()" style="padding-right: 10rpx;border-right: solid 1px #878887;">密码登录</text>
					<text @click="toRegister()" style="padding-left: 10rpx;">注册</text>
				</view>
			</view>
		</view>
	</view>
</template>
	
<script>
	export default {
		data() {
			return {
				phonenumber:'',
				second:60,
				showText:true,
				vercode:'',
				pin:'',
			}
		},
		methods: {
			getPin(){
				if (!this.$validate.isPhone(this.phonenumber)) {
				  uni.showToast( {icon: 'none', title: '请输入正确的手机号'} )
				}
				else{
					this.showText = false
					var interval = setInterval( ()=> {
					    let times = --this.second
					    this.second = times<10?'0'+times:times
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
				}
			},
			submit(){
				if(this.pin!==this.vercode){
					uni.showToast({
						icon: 'none',
						title: '验证码错误'
					})
				}
				else{
					uni.request({
						url: this.consturl+'/user/user',
						method: 'POST',
						data: { phone:this.phonenumber },
						success: (res) => {
							if(res.statusCode!==200){
								uni.showToast( {icon: 'error', title: '登录失败'} )
							}
							else{
								console.log('登录成功')
								uni.setStorageSync('phone', this.phone+'')
								uni.switchTab({
									url:'/pages/assign/assign',
								})
							}
						}
					})
				}
			},
			toPwdlogin(){
				uni.redirectTo({
					url:"./pwdlogin",
				})
			},
			toRegister(){
				uni.navigateTo({
					url:"./register",
				})
			},
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
