<template>
	<view>
		<view class="accepterrHistory">
			<view class="accept_item" v-for="item in orderList">
				<view class="number">
					<text>订单编号：{{item.id}}</text>
					<text class="done" v-if="item.finishtime!==''">客户已付款</text>
					<text class="notdone" v-else>客户未付款</text>
					<view style="position: absolute;right: 20rpx;">
						<image src="../../static/rightArrow.png" 
						style="width: 30rpx;height: 30rpx;"
						@click="goToAcceptOrderDetail(item)"></image>
					</view>
				</view>
				<view class="fromwhere">
					<text class="iconfont icon-yuandianxiao" style="color:#1778FC;"></text>
					<text>{{item.fromWhere}}</text>
				</view>
				<view class="towhere">
					<text class="iconfont icon-yuandianxiao" style="color:#08C050;"></text>
					<text>{{item.toWhere}}</text>
				</view>
				<view class="deadline">
					<text class="iconfont icon-yuandianxiao" style="color:#D9C342;"></text>
					<text>预约时间：{{item.deadline}}</text>
				</view>
				<view class="code">
					<text class="iconfont icon-yuandianxiao" style="color:#ff6633;"></text>
					<text>取件码：{{item.code}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				orderList:[]				
			}
		},
		methods:{
			goToAcceptOrderDetail(item){
				uni.navigateTo({
					url:"../accept/acceptOrderDetail?item=" + JSON.stringify(item),
				})
			},
			async getAllAccepterHistory(id){
				const res = await this.$myRequest({
					url:'/order',
					data:{
						accepter_id:id,
					}
				})
				this.orderList = res.data.order;
			}
		},
		onLoad() {
			this.getAllAccepterHistory(uni.getStorageSync("stu_id"));
		}
	}
</script>

<style>
	.accept_item{
		margin: 10px;
		padding: 5px;
		border-bottom-color: #EED2EE;
		border-bottom-style: double;
	}
	.number{
		display: flex;
	}
	.done{
		margin-left: 20rpx;
		font-size: 12px;
		line-height: 21px;
		padding: 5rpx;
		/* width: 40px;
		height: 21px; */
		text-align: center;
		border-radius: 4px;
		background-color: #E3E3E3;
		color: #919191;
	}
	.notdone{
		margin-left: 20rpx;
		font-size: 12px;
		line-height: 21px;
		/* width: 40px;
		height: 21px; */
		padding: 5rpx;
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
		padding: 0px;
		margin-right: 0px;
		border: 0px;
	}
</style>

