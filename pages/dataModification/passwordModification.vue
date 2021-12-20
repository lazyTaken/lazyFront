<template>
	<view>
		<view class="title">
			<text>更换密码</text>
		</view>
		<form @submit="formSubmit">
			<view class="line">
				<text style="width: 110rpx;text-align: center;">原密码:</text>
				<input type="password" placeholder="请输入原先的密码" 
				style="margin-left: 50rpx;" name="old_password" v-model="old_password"/>
			</view>
			<view class="line">
				<text style="width: 110rpx;text-align: center;">密码:</text>
				<input type="password" placeholder="请输入新的密码" 
				style="margin-left: 50rpx;" name="password" v-model="new_password"/>
			</view>
			<view class="line">
				<text style="width: 110rpx;text-align: center;">密码:</text>
				<input type="password" placeholder="请再次输入新的密码" 
				style="margin-left: 50rpx;" v-model="new_password_again"/>
			</view>
			<button class="submit" form-type="submit">确定</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				old_password:"",
				new_password:"",
				new_password_again:""
			}
		},
		methods: {
			formSubmit:async function(e) {
				//判断两次新密码是否相同
				if(this.new_password != this.new_password_again){
					return uni.showToast({
						title:"两次密码不同",
						icon:"error"
					})
				}
				e.detail.value = {...{"id":uni.getStorageSync("stu_id")},...e.detail.value};
				//此时应向后端提交申请
				var formdata = e.detail.value;
				const res = await this.$myRequest({
					url:'/alterPassword',
					data:formdata
				})
				if(res.data.success == 1){
					uni.showToast({	icon:'success', title:"更改密码成功" })
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1000)
				}else{
					uni.showToast({ icon:"error", title:"更改密码失败" })
				}
			},
		}
	}
</script>

<style>
	.title {
		font-size: 70rpx;
		margin: 20rpx;
	}
	
	.submit {
		border-radius: 50rpx;
		width: 700rpx;
		height: 100rpx;
		line-height: 100rpx;
		background-color: #C852AA;
		font-size: 40rpx;
		color: #FFFFFF;
		font-weight: bold;
		margin-top: 50rpx;
	}
	
	.line {
		margin: 20rpx;
		display: flex;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		border-bottom: solid 1px #C852AA;
	}
</style>
