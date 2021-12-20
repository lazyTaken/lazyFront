<template>
	<view >
		<!-- 导航条 -->
		<view v-if="whetheraccept">
			<view class="nav">
				<view class="nav_item">
					<text :style="color[0]" @click="change0()">待抢单</text>
				</view>
				<view class="nav_item">
					<text :style="color[1]" @click="change1()">待取件</text>
				</view>
				<view class="nav_item">
					<text :style="color[2]" @click="change2()">待送达</text>
				</view>
			</view>
			<!-- 待抢单 -->
			<view class="type0" v-if="show[0]">
				<view class="type_item" v-for="(item,index) in orderrob">
					<view style="line-height: 29px;">
						<text>{{item.ordertime}}</text>
						<text class="big">{{item.type}}</text>
					</view>
					<view>
						<text class="iconfont icon-yuandianxiao" style="color:#1778FC;"></text>
						<text>{{item.fromwhere}}</text>
					</view>
					<view>
						<text class="iconfont icon-yuandianxiao" style="color:#08C050;"></text>
						<text>{{item.towhere}}</text>
					</view>
					<view>
						<text class="iconfont icon-yuandianxiao" style="color:#D9C342;"></text>
						<text>预约时间：{{item.deadline}}</text>
						<button class="rob" @click="rob(item.number,phone)" style="float: right;">抢单</button>
					</view>
				</view>
			</view>
			<!-- 待取件 -->
			<view class="type1" v-if="show[1]">
				<view class="type_item" v-for="(item,index) in ordertaking">
					<view style="line-height: 29px;">
						<text>{{item.ordertime}}</text>
						<text class="detail" @click="orderDetail(item)">>></text>
					</view>
					<view>
						<text class="iconfont icon-yuandianxiao" style="color:#1778FC;"></text>
						<text>{{item.fromwhere}}</text>
					</view>
					<view>
						<text class="iconfont icon-yuandianxiao" style="color:#08C050;"></text>
						<text>{{item.towhere}}</text>
					</view>
					<view class="time">
						<text class="iconfont icon-yuandianxiao" style="color:#D9C342;"></text>
						<text>预约时间：{{item.deadline}}</text>
					</view>
					<view>
						<text class="iconfont icon-yuandianxiao" style="color:#ff6633;"></text>
						<text>取件码：{{item.code}}</text>
						<button class="rob" @click="take(item.code)" style="float: right;">取件</button>
					</view>
				</view>
			</view>
			<!-- 已送达 -->
			<view class="type2" v-if="show[2]">
				<view class="type_item" v-for="(item,index) in ordersending">
					<view style="line-height: 29px;">
						<text>{{item.ordertime}}</text>
						<text class="detail" @click="orderDetail(item)">>></text>
					</view>
					<view>
						<text class="iconfont icon-yuandianxiao" style="color:#1778FC;"></text>
						<text>{{item.fromwhere}}</text>
					</view>
					<view>
						<text class="iconfont icon-yuandianxiao" style="color:#08C050;"></text>
						<text>{{item.towhere}}</text>
					</view>
					<view class="time">
						<text class="iconfont icon-yuandianxiao" style="color:#D9C342;"></text>
						<text>预约时间：{{item.deadline}}</text>
					</view>
					<view>
						<text class="iconfont icon-yuandianxiao" style="color:#ff6633;"></text>
						<text>取件码：{{item.code}}</text>
						<button class="rob" @click="arrive(item.code)" style="float: right;">送达</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userid:'',
				phone:'',
				whetheraccept:true,//默认应该为false
				color:["color: #C852AA; text-decoration: underline;font-weight:bold;","color:#8A8A8A","color:#8A8A8A"],
				show:[1,0,0],
				orderrob:[
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
						status:'0',
						ordertime:"2021-11-11 10:02:00",
						deadline:"2021-11-11 10:30:00",
						robtime:"",
						taketime:"",
						arrivetime:"",
						finishtime:"",
						addition:"无",
						assignerid:"111",
						accepterid:"222",
					}
				],
				ordertaking:[
					{
						number:"xxxxxxxxxxxx",
						type:"小包裹",
						fromwhere:"南理工校医院门口菜鸟驿站",
						towhere:"慧质阁",
						code:"2001-23-233",
						status:'1',
						ordertime:"2021-11-11 10:01:00",
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
					}
				],
				ordersending:[
					{
						number:"xxxxxxxxxxxx",
						type:"小包裹",
						fromwhere:"南理工校医院门口菜鸟驿站",
						towhere:"慧质阁",
						code:"2001-23-233",
						status:'2',
						ordertime:"2021-11-11 10:01:00",
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
						status:'2',
						ordertime:"2021-11-11 10:02:00",
						deadline:"2021-11-11 10:30:00",
						robtime:"2021-11-11 10:05:00",
						taketime:"2021-11-11 10:10:00",
						arrivetime:"",//未送达
						finishtime:"",
						addition:"无",
						assignerid:"111",
						accepterid:"222",
					}
				]
			}
		},
		onLoad() {
			this.phone = uni.getStorageSync('phone')
			const res = this.$myRequest({
				url: '/user/selectByPhone',
				data: {	phone }
			})
			this.userid = res.data.id
			this.whetheraccept = res.data.wetherAccept
			if(this.whetheraccept===true){//可以就刷新、请求
				uni.startPullDownRefresh({
				    success:()=>{}
				});
			}
			else{//如果不可以
				uni.showModal({
					content: '您暂未开通接单功能，请到“我的”申请',
					showCancel: false
				});
			}
		},
		onPullDownRefresh() {
			console.log('refresh')
		    this.request_orderrob();
			this.request_ordertaking();
			this.request_ordersending();
			setTimeout(function () {
				uni.stopPullDownRefresh();  //停止下拉刷新动画
			}, 1000);
		},
		methods: {
			//导航栏点击切换显式
			change0(){
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
			request_orderrob(){//请求待抢订单
				uni.request({
					url: this.consturl+'/order/unHandleOrders',
					method: 'GET',
					success:res=>{
						if(res.statusCode!==200){
							uni.showToast({icon: 'error', title: '获取数据失败'})
						}
						else{
							this.orderrob=res.data;
							console.log('请求待抢订单成功')
						}
					}
				})
			},
			request_ordertaking(){//请求该用户待取件订单
				uni.request({
					url: this.consturl+'/order/unTakenOrders',
					method: 'GET',
					data: {phone:this.phone},
					success:res=>{
						if(res.statusCode!==200){
							uni.showToast({icon: 'error', title: '获取数据失败'})
						}
						else{
							this.ordertaking=res.data
							console.log('请求待取件订单成功')
						}
					}
				})
			},
			request_ordersending(){//请求该用户待送达订单
				uni.request({
					url: this.consturl+'/order/unArrivedOrders',
					method: 'GET',
					data: {phone:this.phone},
					success:res=>{
						if(res.statusCode!==200){
							uni.showToast({icon: 'error', title: '获取数据失败'})
						}
						else{
							this.ordersending=res.data
							console.log('请求待送达订单成功')
						}
					}
				})
			},
			rob(number,phone){//抢单
				uni.request({
					url: this.consturl+'/order/grabOrder',
					method: 'GET',
					data: {id: number, phone: phone},
					success:res=>{
						console.log(res.statusCode)
						if(res.statusCode !== 200){
							uni.showToast({icon: 'error', title:'抢单失败'})
						}
						else{
							this.request_orderrob();
							this.request_ordertaking();
						}
					}
				})
			},
			take(number){//取件
				uni.request({
					url: this.consturl+'/order/pickup',
					method: 'GET',
					data: {id: number},
					success:res=>{
						if(res.statusCode===200){
							uni.showToast({icon: 'success', title:'取件成功', duration: 2000})
							request_ordertaking()
							request_ordersending()
						}
					}
				})
			},
			arrive(number){//送达
				uni.request({
					url: this.consturl+'/order/arrive',
					method: 'GET',
					data: {id: number},
					success:res=>{
						if(res.statusCode===200){
							uni.showToast({icon: 'success', title: '已送达', duration: 2000})
							request_ordertaking()
							request_ordersending()
						}
					}
				})
			},
			orderDetail(item){//>>订单详情
				uni.navigateTo({
					url: './acceptOrderDetail?item=' + JSON.stringify(item)
				})
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
		margin-left: 20rpx;
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
	.type_item{
		margin: 10px;
		padding: 5px;
		border-bottom-color: #EED2EE;
		border-bottom-style: double;
	}
	.detail{
		float: right;
		color: #C852AA;
	}
	.payover{
		float: right;
		font-size: 12px;
		line-height: 29px;
		width: 40px;
		height: 29px;
		text-align: center;
		border-radius: 4px;
		background-color: #E3E3E3;
		color: #919191;
	}
	.notpay{
		float: right;
		font-size: 12px;
		line-height: 29px;
		width: 40px;
		height: 29px;
		text-align: center;
		border-radius: 4px;
		background-color: #FFE8DE;
		color: #FF5810;
	}
</style>
