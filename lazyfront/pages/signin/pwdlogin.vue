<template>
	<view>
		<view class="login">
			<view class="title">
				<text>密码登录</text>
			</view>
			<view class="line">
				<text style="width: 80rpx;text-align: center;">+86</text>
				<input type="text" v-model="phone" placeholder="请输入手机号码" style="margin-left: 50rpx;" name='phone'/>
			</view>
			<view class="line">
				<text class="iconfont icon-mima" style="width: 80rpx;text-align: center;"></text>
				<input type="password" placeholder="请输入密码" style="margin-left: 50rpx;" name='pwd'/>
			</view>
			<button class="submit" form-type="submit" @click="toAssign()">登录</button>
			<view class="lastline">
				<view>
					<text @click="toPinlogin()" style="padding-right: 10rpx;border-right: solid 1px #878887;">验证码登录</text>
					<text @click="toRegister()" style="padding-left: 10rpx;">注册</text>
				</view>
				<text @click="toForgetpwd()">忘记密码？</text>
			</view>
		</view>
	</view>
</template>
	
<script>
	export default {
		data() {
			return {
				phone:'',
			}
		},
		onLoad() {//设置自动登录
			let phone=uni.getStorageSync('phone');
			if(phone!==''){
				uni.switchTab({
					url:"/pages/assign/assign"
				})
			}
		},
		methods: {
			toPinlogin(){
				uni.redirectTo({
					url:"./pinlogin",
				})
			},
			toRegister(){
				uni.navigateTo({
					url:"./register",
				})
			},
			toForgetpwd(){
				uni.navigateTo({
					url:"./forgetpwd",
				})
			},
			toAssign(){
				uni.setStorageSync('phone',this.phone+'')//设置缓存
				uni.switchTab({
					url:"/pages/assign/assign"
				})
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
