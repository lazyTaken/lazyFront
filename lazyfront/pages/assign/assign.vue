<template>
	<view class="content">
		<view class="assign">
			
			<view class="assign_item">
				<view class="time">
					<text>2021年 10月 11日 10:00</text>
					<text class="done" v-if="isDone[0]">已完成</text>
					<text class="notdone" v-else>进行中</text>
					<button class="itemdetail" @click="orderDetail(isDone[0])">>></button>
				</view>
				<view class="fromwhere">
					<text class="iconfont icon-yuandianxiao" style="color:#1778FC;"></text>
					<text>南理工校医院门口菜鸟驿站</text>
				</view>
				<view class="towhere">
					<text class="iconfont icon-yuandianxiao" style="color:#08C050;"></text>
					<text>慧质阁</text>
				</view>
			</view>
			
			<view class="assign_item">
				<view class="time">
					<text>2021年 10月 11日 10:00</text>
					<text class="done" v-if="isDone[1]">已完成</text>
					<text class="notdone" v-else>进行中</text>
					<button class="itemdetail">>></button>
				</view>
				<view class="fromwhere">
					<text class="iconfont icon-yuandianxiao" style="color:#1778FC;"></text>
					<text>南理工校医院门口菜鸟驿站</text>
				</view>
				<view class="towhere">
					<text class="iconfont icon-yuandianxiao" style="color:#08C050;"></text>
					<text>慧质阁</text>
				</view>
			</view>
			<!-- 加号 -->
			<text class="iconfont icon-jia" @click="addAssign()"></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:[],
				isDone:[true,false],
			}
		},
		onLoad() {
			//先请求数据，然后判断订单是否已完成
			uni.request({
				url:"",
				success:res=>{
					console.log(res)
					if(res.data.status!==0){
						return uni.showToast({
							title:"获取数据失败"
						})
					}
					this.data=res.data.message
				}
			})
		},
		methods: {
			orderDetail(doneornot){//点击>>事件，需要把此订单信息传过去
				uni.navigateTo({
					url:"./assignOrderDetail?isDone=doneornot",
				})
			},
			addAssign(){//下单事件
				uni.navigateTo({
					url:"../test/test",//跳转到下单页面
				})
			}
		}
	}
</script>

<style lang="scss">
	.time{
		display: flex;
	}
	.done{
		margin-left: 3px;
		font-size: 12px;
		line-height: 21px;
		width: 40px;
		height: 21px;
		text-align: center;
		border-radius: 4px;
		background-color: #E3E3E3;
		color: #919191;
	}
	.notdone{
		margin-left: 3px;
		font-size: 12px;
		line-height: 21px;
		width: 40px;
		height: 21px;
		text-align: center;
		border-radius: 4px;
		background-color: #FFE8DE;
		color: #FF5810;
	}
	.itemdetail{
		width: 23px;
		height: 23px;
		line-height: 23px;
		background-color:transparent;
		font-size: 30rpx;
		color: #C852AA;
		font-weight:bold;
		padding: 0px;
		margin-right: 0px;
		border: 0px;
	}
	button::after{
		  border: 0;
	}
	.assign_item{
		margin: 10px;
		padding: 5px;
		border-bottom-color: #EED2EE;
		border-bottom-style: double;
	}
	.icon-jia{
		position: fixed;
		right: 70rpx;
		bottom: 300rpx;
		color: #C852AA;
		font-size: 40px;
	}
	.icon-yuandianxiao{
		font-size: 28px;
		vertical-align: middle;
	}
	
</style>
