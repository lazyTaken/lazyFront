<template>
	<view>
		<view class="login">
			<view class="title">
				<text>注册</text>
			</view>
			<form @submit="formSubmit">
				<view class="line">
					<text style="width: 80rpx;text-align: center;">学号</text>
					<input type="text" placeholder="请输入学号" style="margin-left: 50rpx;" name='stu_id'/>
				</view>
				<view class="line">
					<text style="width: 80rpx;text-align: center;">姓名</text>
					<input type="text" placeholder="请输入姓名" style="margin-left: 50rpx;" name="user_name"/>
				</view>
				<view class="line">
					<text style="width: 80rpx;text-align: center;">+86</text>
					<input type="text" placeholder="请输入手机号码" style="margin-left: 50rpx;" name="phone"/>
				</view>
				<view class="line">
					<text class="iconfont icon-mima" style="width: 80rpx;text-align: center;"></text>
					<input type="text" placeholder="请输入验证码" style="margin-left: 50rpx;width: 220rpx;" name="pin"/>
					<text style="margin-left: 100rpx;border-left: solid 1px #C852AA;padding-left: 25rpx;padding-right: 25rpx;color: #C852AA;" @click="getPin()">获取验证码</text>
				</view>
				<view class="line">
					<text style="width: 80rpx;text-align: center;"></text>
					<input type="password" placeholder="密码" style="margin-left: 50rpx;width: 500rpx;" name="pwd"/>
				</view>
				<view class="line">
					<text style="width: 80rpx;text-align: center;"></text>
					<input type="password" placeholder="确认密码" style="margin-left: 50rpx;width: 500rpx;"/>
				</view>
			</form>
			<!-- <button class="submit" form-type="submit">注册</button> -->
			<button class="submit" @click="pretend()">注册</button>
			
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
				uni.request({
					url:'',
					
				})
			},
			pretend(){
				uni.redirectTo({
					url:"./pwdlogin"
				})
			},
			formSubmit:function(e){//可以添加校验
				let data=JSON.stringify(e.detail.value);
				uni.request({
					url:"",
					data:data,
					success: (res) => {
						if(res.data.status!==0){
							return uni.showToast({//提示注册失败
								title:'注册失败'
							})
						}
						uni.redirectTo({//成功跳转到密码登录
							url:"./pwdlogin"
						})
					}
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
