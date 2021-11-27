<template>
	<view>
		<view class="nav">
			<view class="nav_item">
				<text :style="color[0]" @click="change0()">待抢单</text>
			</view>
			<view class="nav_item">
				<text :style="color[1]" @click="change1()">派送中</text>
			</view>
			<view class="nav_item">
				<text :style="color[2]" @click="change2()">已送达</text>
			</view>
		</view>
		<view class="type0" v-if="show[0]">
			<view class="type_item">
				<view>
					<text>2021年 10月 11日 10:00</text>
					<text class="big">大包裹</text>
					<text class="price">￥3</text>
				</view>
				<view>
					<text class="iconfont icon-yuandianxiao" style="color:#1778FC;"></text>
					<text>南理工校医院门口菜鸟驿站</text>
				</view>
				<view>
					<text class="iconfont icon-yuandianxiao" style="color:#08C050;"></text>
					<text>慧质阁</text>
				</view>
				<view class="time">
					<text class="iconfont icon-yuandianxiao" style="color:#D9C342;"></text>
					<text>预约时间：2021-11-10 10:00</text>
					<button class="rob" @click="">抢单</button>
				</view>
			</view>
		</view>
		
		<view class="type1" v-if="show[1]">
			<view class="type_item">
				<view>
					<text>2021年 10月 11日 10:00</text>
					<text class="detail" @click="toOrderDetail()">>></text>
				</view>
				<view>
					<text class="iconfont icon-yuandianxiao" style="color:#1778FC;"></text>
					<text>南理工校医院门口菜鸟驿站</text>
				</view>
				<view>
					<text class="iconfont icon-yuandianxiao" style="color:#08C050;"></text>
					<text>慧质阁</text>
				</view>
				<view class="time">
					<text class="iconfont icon-yuandianxiao" style="color:#D9C342;"></text>
					<text>预约时间：2021-11-10 10:00</text>
				</view>
				<view style="display: flex;">
					<text class="iconfont icon-yuandianxiao" style="color:#ff6633;"></text>
					<text>取件码：277-3-6002</text>
					<button class="rob" @click="finish()">送达</button>
				</view>
			</view>
		</view>
		
		<view class="type2" v-if="show[2]">
			<view class="type_item">
				<view>
					<text>2021年 10月 11日 10:00</text>
					<text class="detail" @click="toOrderDetail()">>></text>
				</view>
				<view>
					<text class="iconfont icon-yuandianxiao" style="color:#1778FC;"></text>
					<text>南理工校医院门口菜鸟驿站</text>
				</view>
				<view>
					<text class="iconfont icon-yuandianxiao" style="color:#08C050;"></text>
					<text>慧质阁</text>
				</view>
				<view class="time">
					<text class="iconfont icon-yuandianxiao" style="color:#D9C342;"></text>
					<text>预约时间：2021-11-10 10:00</text>
				</view>
				<view style="display: flex;">
					<text class="iconfont icon-yuandianxiao" style="color:#ff6633;"></text>
					<text>取件码：277-3-6002</text>
					<button class="rob" disabled="true">已送达</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				color:["color: #C852AA; text-decoration: underline;font-weight:bold;","color:#8A8A8A","color:#8A8A8A"],
				show:[1,0,0],
			}
		},
		methods: {
			change0(){//导航栏点击切换显式
				this.color=["color:#C852AA;text-decoration:underline;font-weight:bold;","color:#8A8A8A","color:#8A8A8A"],
				this.show=[1,0,0]
			},
			change1(){
				this.color=["color:#8A8A8A","color:#C852AA;text-decoration:underline;font-weight:bold;","color:#8A8A8A"],
				this.show=[0,1,0]
			},
			change2(){
				this.color=["color:#8A8A8A","color:#8A8A8A","color:#C852AA;text-decoration:underline;font-weight:bold;"],
				this.show=[0,0,1]
			},
			toOrderDetail(){//点击>>事件
				uni.navigateTo({
					url:"./acceptOrderDetail",
				})
			},
			finish(){//点击送达事件
				
			},
			
			
		}
	}
</script>

<style>
	.nav{
		display: flex;
		border-top: solid 2px #C852AA;
		border-bottom: solid 2px #C852AA;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		padding: 20rpx;
	}
	.nav_item{
		width: 33.3%;
		text-align: center;
		font-size: 30rpx;
		color: #8A8A8A;
	}
	.big{
		color: #C852AA;
		font-size: 14px;
		margin-left: 20px;
	}
	.price{
		color: #C852AA;
		font-size: 17px;
		font-weight: bold;
		margin-left: 100rpx;
	}
	.icon-yuandianxiao{
		vertical-align: middle;
		font-size: 28px;
	}
	.rob{
		width: 50px;
		height: 28px;
		line-height: 28px;
		background-color:#C852AA;
		font-size: 30rpx;
		color: #FFFFFF;
		font-weight:bold;
		padding: 0px;
		margin-right: 0px;
		border: 0px;
	}
	button::after{
		  border: 0;
	}
	.time{
		display: flex;
	}
	.type_item{
		margin: 10px;
		padding: 5px;
		border-bottom-color: #EED2EE;
		border-bottom-style: double;
	}
	.detail{
		float: right;
		font-weight: bold;
		color: #C852AA;
	}
</style>
