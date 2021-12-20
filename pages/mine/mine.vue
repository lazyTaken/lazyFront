<template>
	<view class="content">
		<view class="someFunctions">
			<view class="sF_1" style="width: 20%;">
				<image :src="this.hP" class="headPicture" @click="previewImg"></image>	
			</view>
			<text class="txt_userName">{{userName}}</text>
			<view class="sF_1"></view>
			<view class="sF_1">
				<text class="txt_assigner" style="position: absolute;right: 250rpx;top:0rpx"
					v-if="identity==0">派单</text>
				<image src="../../static/mine/transform.png" class="transform"
					style="position: absolute;right: 180rpx;top:80rpx" @click="transform">
				</image>
				<text class="txt_taker" style="position: absolute;right: 100rpx;top:0rpx"
				 v-if="identity==1">接单</text>
				<image src="../../static/mine/dataModification.png" class="dataModification"
					style="position: absolute;right: 20rpx;top:70rpx" @click="goToDataModification"></image>
			</view>
		</view>
		<view class="list" @click="historyV">
			<image src="../../static/mine/history.png" class="list_icon"></image>
			<text class="list_txt">历史交易</text>
			<view style="position: absolute;right: 20rpx;">
				<image src="../../static/rightArrow.png" style="width: 30rpx;height: 30rpx;"></image>
			</view>
		</view>
		<view class="list" @click="paymentV">
			<image src="../../static/mine/payment.png" class="list_icon"></image>
			<text class="list_txt">支付方式</text>
			<view style="position: absolute;right: 20rpx;">
				<image src="../../static/rightArrow.png" style="width: 30rpx;height: 30rpx;"></image>
			</view>
		</view>
		<button class="loginout" @click="loginout()">退出登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hP: "../../static/mine/headPicture.png",
				headPictureSrc: ["../../static/mine/headPicture.png"], //目前还是本地头像
				identity: 0, //默认身份为0,即派单者
				phone: uni.getStorageSync("phone"),
				userName:uni.getStorageSync("user_name")
			}
		},
		methods: {
			goToDataModification() {
				uni.navigateTo({
					url: "../dataModification/dataModification",
				})
			},
			previewImg() {//头像展示
				uni.previewImage({
					urls: this.headPictureSrc,
				})
			},
			historyV() {
				console.log("查看历史交易");
				if (this.identity == 1) {
					uni.navigateTo({
						url: "../history/accepterHistroy",
					})
				} else if (this.identity == 0) {
					uni.navigateTo({
						url: "../history/assignerHistory",
					})
				}
			},
			paymentV() {
				console.log("查看支付方式");
				uni.navigateTo({
					url: "../payment/payment"
				})
			},
			transform() {
				var wetherAccept = uni.getStorageSync("wetherAccept");
				if (this.identity === 0 && wetherAccept === "0") {//转入接单者注册页面
					uni.navigateTo({
						url: "../accpterRegister/accepterRegister"
					})
				} 
				else {//否则变更身份
					this.identity = !this.identity;
				}
			},
			async getAllUserData(phone) {//通过手机号获取所有信息
				const res = await this.$myRequest({
					url: '/user/selectByPhone',
					data: {	phone }
				})
				this.userName = res.data.name;
				uni.setStorageSync("stu_id", res.data.id);
				uni.setStorageSync("user_name", res.data.name);
				uni.setStorageSync("wetherAccept", res.data.wetherAccept);
				uni.setStorageSync("weixin",res.data.weixin);
				uni.setStorageSync("alipay",res.data.alipay);
			},
			getUserHeadPicture(phone) {//获取头像
				uni.request({
					url: this.consturl + '/user/getImageToFront',
					data:{ phone },
					responseType:'arraybuffer',
					success: (res) => {
						console.log('这里应该收到了图片返回' + res.data);
						let datas = res.data;
						this.headPictureSrc[0] = 'data:image/png;base64,' + btoa(new Uint8Array(datas).reduce((datas, byte) => datas + String.fromCharCode(byte), ''));
						this.hP = this.headPictureSrc[0];
						uni.setStorageSync("photoSrc",this.headPictureSrc[0]);
					}
				})
			},
			loginout(){
				uni.clearStorageSync()
				uni.redirectTo({
					url: '../signin/pwdlogin'
				})
			}
		},
		onShow(){
			this.phone = uni.getStorageSync("phone");
			//在进入个人中心时，把数据所有数据加载到本地	
			this.getAllUserData(this.phone);
			this.getUserHeadPicture(this.phone);
		}
	}
</script>

<style>
	.someFunctions {
		background-color: rgba(200, 82, 170, 100);
		display: flex;
		line-height: 200rpx;
	}

	.sF_1 {
		float: right;
		margin: auto;
		width: 33.3%;
		display: flex;
		align-items: center;
		text-align: right;
	}

	.sF_3 {
		text-align: right;

		width: 33%;
		border: 3px solid #73AD21;

	}

	.img_item {
		text-align: center;
	}

	.headPicture {
		margin: 5px;
		width: 108rpx;
		height: 108rpx;
		border-radius: 500px;
		border: 2px solid rgba(255, 255, 255, 100);
	}

	.txt_userName {
		margin: 5px;
		color: rgba(255, 255, 255, 100);
		font-size: 20px;
		font-family: PingFangSC-bold;
	}

	.txt_assigner {
		margin: 5px;
		color: rgba(255, 255, 255, 100);
		font-size: 15px;
		font-family: PingFangSC-bold;
	}

	.transform {
		margin: 5px;
		width: 24px;
		height: 24px;
	}

	.txt_taker {
		margin: 5px;
		color: rgba(255, 255, 255, 100);
		font-size: 15px;
		text-align: center;
		font-family: PingFangSC-bold;
	}

	.dataModification {
		margin: 5px;
		text-align: right;
		width: 60rpx;
		height: 60rpx;
	}

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
		text-align: center;
		font-family: PingFangSC-bold;
	}
	
	.loginout{
		border-radius: 30rpx;
		width: 70%;
		height: 80rpx;
		line-height: 80rpx;
		background-color:#C852AA;
		font-size: 40rpx;
		color: #FFFFFF;
		font-weight:bold;
		position: absolute;
		bottom: 80px;
		left: 15%;
	}
</style>
