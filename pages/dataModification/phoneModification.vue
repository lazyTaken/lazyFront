<template>
	<view>
		<view class="title">
			<text>更换手机号码</text>
		</view>
		<view class="subtitle">
			<text>可通过新的手机号码找回密码、验证身份</text>
		</view>
		<form @submit="formSubmit" id="changeForm">
			<view class="line">
				<text style="width: 140rpx;text-align: left;">学号:</text>
				<input type="text" placeholder="请输入学号" 
				style="margin-left: 20rpx;" name="id" v-model="stu_id"/>
			</view>
			<view class="line">
				<text style="width: 140rpx;">原手机号:</text>
				<input type="text" placeholder="请输入原先的手机号码" 
				style="margin-left: 20rpx;" v-model="old_phone"/>
			</view>
			<view class="line">
				<text style="width: 140rpx;">新手机号:</text>
				<input type="text" placeholder="请输入新的手机号码" 
				style="margin-left: 20rpx;" name="phone" v-model="new_phone"/>
			</view>
			<view class="line">
				<text class="iconfont icon-mima" style="width: 80rpx;text-align: center;"></text>
				<input type="text" placeholder="请输入验证码" 
				style="margin-left: 20rpx;width: 220rpx;" v-model="pin"/>
				<text style="margin-left: 150rpx;border-left: solid 1px #C852AA;padding-left: 25rpx;padding-right: 25rpx;color: #C852AA;" @click="getPin" >获取验证码</text>
			</view>
			<button class="submit" form-type="submit">确定</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				stu_id:"",
				old_phone:"",
				new_phone:"",
				pin:""
			}
		},
		methods: {
			formSubmit:async function(e) {
				//判断是否有信息填写不全
				console.log(this.stu_id+this.old_phone+this.new_phone+this.pin);
				if(this.stu_id == "" || this.old_phone == "" || this.new_phone == "" || this.pin == ""){
					return uni.showToast({ icon:"error",title:"信息填写不全" })
				}
				//判断学号是否输入错误
				if(this.stu_id != uni.getStorageSync("stu_id")){
					return uni.showToast({icon:"error", title:"学号输入错误" })
				}
				if(this.old_phone != uni.getStorageSync("phone")){
					return uni.showToast({icon:"error", title:"手机号输入错误" })
				}
				//此时应向后端提交申请
				var formdata = e.detail.value;
				const res = await this.$myRequest({
					url:'/alterPhone',
					data:formdata
				})
				//如果成功
				if(res.data.success == 1){
					uni.setStorageSync("phone",e.detail.value.phone);
					uni.showToast({
						title:"更改电话号码成功",
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1500)
				}
				else{
					uni.showToast({ icon:"error",title:"更改电话号码失败" })
				}
			},
			getPin(){//获取验证码
				
			},
		}
	}
</script>

<style>
	.title {
		font-size: 70rpx;
		margin: 20rpx;
	}

	.subtitle {
		font-size: 20rpx;
		margin: 20rpx;
		color: #909090;
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
