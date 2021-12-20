<template>
	<view class="content">
		<view class="assign">
			<view class="assign_item" v-for="(item,index) in order">
				<view class="time">
					<text>{{item.ordertime}}</text>
					<text class="status" v-if="item.status=='4'" style="background-color: #FFFFFF; color: #00cc00;">已完成</text>
					<text class="status" v-else-if="item.status=='5'">已取消</text>
					<text class="status" v-else style="background-color: #FFE8DE; color: #FF5810;">进行中</text>
					<button class="itemdetail" @click="orderDetail(item)">>></button>
				</view>
				<view class="fromwhere">
					<text class="iconfont icon-yuandianxiao" style="color:#1778FC;"></text>
					<text>{{item.fromwhere}}</text>
				</view>
				<view class="towhere">
					<text class="iconfont icon-yuandianxiao" style="color:#08C050;"></text>
					<text>{{item.towhere}}</text>
				</view>
			</view>
			<text class="iconfont icon-jia" @click="addAssign()"></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:'',
				order:[
					{
						number:"xxxxxxxxxxxx",//已完成的订单
						type:"小包裹",
						fromwhere:"南理工校医院门口菜鸟驿站",
						towhere:"慧质阁",
						code:"2001-23-233",
						status:'4',
						ordertime:"2021-11-11 10:00:00",
						deadline:"2021-11-11 10:30:00",
						robtime:"2021-11-11 10:05:00",
						taketime:"2021-11-11 10:10:00",
						arrivetime:"2021-11-11 10:20:00",
						finishtime:"2021-11-11 10:25:00",
						addition:"无",
						assignerid:"111",
						accepterid:"222",
					},
					{
						number:"xxxxxxxxxxxx",
						type:"小包裹",
						fromwhere:"南理工校医院门口菜鸟驿站",
						towhere:"慧质阁",
						code:"2001-23-233",
						status:'0',
						ordertime:"2021-11-11 10:01:00",
						deadline:"2021-11-11 10:30:00",
						robtime:"",
						taketime:"",
						arrivetime:"",
						finishtime:"",
						addition:"无",
						assignerid:"111",
						accepterid:"222",
					},
					{
						number:"xxxxxxxxxxxx",
						type:"小包裹",
						fromwhere:"南理工校医院门口菜鸟驿站",
						towhere:"慧质阁",
						code:"2001-23-233",
						status:'1',
						ordertime:"2021-11-11 10:02:00",
						deadline:"2021-11-11 10:30:00",
						robtime:"2021-11-11 10:05:00",
						taketime:"",//未被取件
						arrivetime:"",
						finishtime:"",
						addition:"无",
						assignerid:"111",
						accepterid:"222",
					},
					{
						number:"xxxxxxxxxxxx",
						type:"小包裹",
						fromwhere:"南理工校医院门口菜鸟驿站",
						towhere:"慧质阁",
						code:"2001-23-233",
						status:'2',
						ordertime:"2021-11-11 10:03:00",
						deadline:"2021-11-11 10:30:00",
						robtime:"2021-11-11 10:05:00",
						taketime:"2021-11-11 10:10:00",
						arrivetime:"",//未送达
						finishtime:"",
						addition:"无",
						assignerid:"111",
						accepterid:"222",
					},
					{
						number:"xxxxxxxxxxxx",
						type:"小包裹",
						fromwhere:"南理工校医院门口菜鸟驿站",
						towhere:"慧质阁",
						code:"2001-23-233",
						status:'3',
						ordertime:"2021-11-11 10:04:00",
						deadline:"2021-11-11 10:30:00",
						robtime:"2021-11-11 10:05:00",
						taketime:"2021-11-11 10:10:00",
						arrivetime:"2021-11-11 10:20:00",//送达
						finishtime:"",
						addition:"无",
						assignerid:"111",
						accepterid:"222",
					},
					{
						number:"xxxxxxxxxxxx",
						type:"小包裹",
						fromwhere:"南理工校医院门口菜鸟驿站",
						towhere:"慧质阁",
						code:"2001-23-233",
						status:'5',//取消
						ordertime:"2021-11-11 10:04:00",
						deadline:"2021-11-11 10:30:00",
						robtime:"2021-11-11 10:05:00",
						taketime:"",
						arrivetime:"",
						finishtime:"",
						addition:"无",
						assignerid:"111",
						accepterid:"222",
					},
				],
			}
		},
		onLoad() {
			this.phone = uni.getStorageSync('phone')
			uni.startPullDownRefresh({
			    success:()=>{
					console.log('refresh')
			    }
			})
		},
		onPullDownRefresh() {//监听是否有刷新，并执行动作
		        uni.request({//请求历史订单数据
		        	url: this.consturl+'/getAllOrder',
					method:'POST',
					data:{ phone: this.phone },
					success:res=>{
		        		if(res.statusCode===200){
		        			console.log('获取数据成功')
							console.log(res.data)
							this.order=res.data
		        		}
		        	}
		        })
		        setTimeout(function () {
		            uni.stopPullDownRefresh()  //停止下拉刷新动画
		        }, 1000)
		},
		methods: {
			orderDetail(item){
				uni.navigateTo({
					url:'./assignOrderDetail?item='+JSON.stringify(item)
				})
			},
			addAssign(){//下单
				uni.navigateTo({
					url:"../order/order",
				})
			},
		}
	}
</script>

<style lang="scss">
	.time{
		display: flex;
	}
	.status{
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
	.itemdetail{
		width: 23px;
		height: 23px;
		line-height: 23px;
		background-color:transparent;
		font-size: 30rpx;
		color: #C852AA;
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
