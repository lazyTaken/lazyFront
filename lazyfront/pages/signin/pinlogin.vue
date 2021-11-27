<template>
	<view>
		<view class="login">
			<view class="title">
				<text>验证码登录</text>
			</view>
			<view class="line">
				<text style="width: 80rpx;text-align: center;">+86</text>
				<input type="text" placeholder="请输入手机号码" style="margin-left: 50rpx;"/>
			</view>
			<view class="line">
				<text class="iconfont icon-mima" style="width: 80rpx;text-align: center;"></text>
				<input type="text" placeholder="请输入验证码" style="margin-left: 50rpx;width: 220rpx;"/>
				<text style="margin-left: 100rpx;border-left: solid 1px #C852AA;padding-left: 25rpx;padding-right: 25rpx;color: #C852AA;" @click="getPin()">获取验证码</text>
			</view>
			<button class="submit" form-type="submit">登录</button>
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
				
			}
		},
		methods: {
			getPin(){//获取验证码
				
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
