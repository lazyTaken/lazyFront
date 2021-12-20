<template>
	<view>
		<view class="Top">
			<image :src="headPictureSrc[0]" class="headPicture" @click="previewImg"></image>
			<text class="txt_userName">子墨</text>
		</view>
			<view class="line">
				<text style="width: 80rpx;text-align: center;">学号:</text>
				<text style="margin-left: 50rpx; color: #919191;">{{stu_id}}</text>
			</view>
			<view class="line">
				<text style="width: 80rpx;text-align: center;">姓名:</text>
				<text style="margin-left: 50rpx; color: #919191;">{{user_name}}</text>
			</view>
			<view class="line">
				<text style="width: 80rpx;text-align: center;">电话:</text>
				<text style="margin-left: 50rpx; color: #919191;">{{phone}}</text>
			</view>
			<form @submit="formSubmit">
				<textarea class="reason" placeholder="接单原因:" placeholder-style="margin:5rpx" name="reason"></textarea>
				<button form-type="submit" class="submit">立即申请</button>
			</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				headPictureSrc: ["../../static/mine/headPicture.png"], //目前还是本地头像
				stu_id: '12221121121',
				user_name: 'rrr',
				phone: '12341451511',
			}
		},
		onLoad() {
			this.stu_id = uni.getStorageSync("stu_id")
			this.user_name = uni.getStorageSync("user_name")
			this.phone = uni.getStorageSync("phone")
		},
		methods: {
			formSubmit: function(e) {
				var formdata = e.detail.value;
				uni.request({
					url:'',
					data: JSON.stringify(formdata),
					success: (res) => {
						if(res.statusCode===200){
							uni.showToast({
								icon:'success',title:'申请已提交'
							})
						}
					}
				})
			},
		}
	}
</script>

<style>
	.Top {
		background-color: rgba(200, 82, 170, 100);
		display: flex;
		align-items: center;
		line-height: 200rpx;
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

	.line {
		margin: 20rpx;
		display: flex;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		border-bottom: solid 1px #C852AA;
	}

	.submit {
		border-radius: 50rpx;
		width: 700rpx;
		height: 100rpx;
		line-height: 100rpx;
		background-color: #C852AA;
		font-size: 30rpx;
		color: #FFFFFF;
		font-weight: bold;
		margin-top: 20rpx;
	}

	.reason {
		padding: 10rpx;
		border-radius: 10px;
		width: 690rpx;
		margin: 20rpx;
		border: 1px solid #C852AA;
	}
</style>
