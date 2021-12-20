<template>
	<view>
		<view class="list">
			<image src="../../static/AliPay.png" class="list_icon"></image>
			<text class="list_txt">支付宝账号：</text>
			<input type="text" v-model="alipay2" @input="disable()" style="text-align:left; color:#CCCCCC; font-size:15px;"/>
		</view>
		<view class="list">
			<image src="../../static/WeChat.png" class="list_icon"></image>
			<text class="list_txt">微信账号：</text>
			<input type="text" v-model="weixin2" @input="disable()" style="text-align:left; color:#CCCCCC; font-size:15px;"/>
		</view>
		<button class="submit" :disabled="ischange" @click="change()">确认修改</button>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				weixin:'12345678901',
				weixin2:'12345678901',
				alipay:'12345678901',
				alipay2:'12345678901',
				ischange:true,
			}
		},
		onLoad() {
			this.weixin=uni.getStorageSync('weixin')
			this.weixin2=uni.getStorageSync('weixin')
			this.alipay=uni.getStorageSync('alipay')
			this.alipay2=uni.getStorageSync('alipay')
		},
		methods:{
			disable() {
				if(this.weixin!==this.weixin2 || this.alipay!==this.alipay2){
					this.ischange=false
				}
			},
			change(){
				uni.request({
					url: this.consturl+'/',
					data:{weixin:this.weixin, alipay:this.alipay},
					success: (res) => {
						if(res.statusCode===200){
							uni.showToast({
								icon:'none',title:'修改成功'
							})
							uni.redirectTo({
								url:'../mine/mine'
							})
						}
					}
				})
			}
		},
	}
	
</script>

<style>
	.list {
		height: 100rpx;
		margin: 20rpx;
		display: flex;
		border-bottom: 1px solid #d9d9d9;
		text-align: center;
		align-items: center;
	}
	.list_icon {
		height: 40rpx;
		width: 40rpx;
	}
	
	.list_txt {
		margin-left: 20rpx;
		font-size: 15px;
		text-align: left;
		font-family: PingFangSC-bold;
		width: 200rpx;
	}
	
	.submit {
		width: 30%;
		height: 30%;
		border-radius: 10rpx;
		background-color: #C852AA;
		font-size: 30rpx;
		color: #FFFFFF;
		font-weight: normal;
		margin-top: 50rpx;
	}
</style>
