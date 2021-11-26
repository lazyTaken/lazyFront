<template>
	<view class="content">
			<image class="logo" src="/static/logo.png"></image>
			<view class="text-area">
				<text class="version">{{version}}</text>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				version:"V1.0.0",
			}
		},
		onLoad() {
			this.Jump();
		},
		methods: {
			Jump(){
				let timeStart=setInterval(function(){
						clearInterval(timeStart);
						uni.switchTab({
							url:"/pages/assign/assign"
						})
				},3000)
			}
			
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 150rpx;
		width: 346rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}
	
	.text-area {
		display: flex;
		justify-content: center;
	}
	
	.version {
		font-size: 36rpx;
		color: #8f8f94;
		position: fixed;
		bottom: 200rpx;
	}
	
</style>
