<template>
	<view class="content">
		<view class="detail">
			<view>
				<text class="type">{{orderDetail.type}}</text>
			</view>
			<view>下单时间：{{orderDetail.ordertime}}</view>
			<view>订单编号：{{orderDetail.number}}</view>
			<view>快递所在地：{{orderDetail.fromwhere}}</view>
			<view>收货地址：{{orderDetail.towhere}}</view>
			<view>取货码：{{orderDetail.code}}</view>
			<view>预约时间：{{orderDetail.deadline}}</view>
			<view>送达时间：{{orderDetail.arrivetime}}</view>
			<view>订单完成时间：{{orderDetail.finishtime}}</view>
			<view>备注：{{orderDetail.addition}}</view>
		</view>
		<view class="contact">
			<view class="name">
				<text>下单人员：{{assignername}}</text>
				<text>
					<text class="iconfont icon-duanxin_o" @click="connectOnline()"></text>
					<text class="iconfont icon-dianhua" @click="connectPhone()"></text>
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderDetail:{},
				assignername:'',
				assignerphone:'',
			}
		},
		onLoad: function (options) {
			if(options!==null){
				var item = JSON.parse(options.item);
				this.orderDetail = item;
				uni.request({
					url: this.consturl+'/order/peopleInfo',
					data:{id: this.orderDetail.number},
					method:'GET',
					success: (res) => {
						if(res.statusCode===200){
							this.assignername=res.data['assignername']
							this.assignerphone=res.data['assignerphone']
						}
					}
				})
			}
		},
		methods: {
			connectOnline(){
				uni.navigateTo({
					url:"../chat/chat",
				})
			},
			connectPhone(){
				uni.makePhoneCall({
					phoneNumber: this.assignerphone 
				})
			},
		},
	}
</script>

<style lang="scss">
	.content{
		margin: 20px;
		padding: 15px;
		border: solid 1px #C852AA;
	}
	.detail{
		line-height: 33px;
		padding-bottom: 20px;
		border-bottom: solid 1px #C852AA;
	}
	.type{
		font-size: 18px;
		font-weight: bold;
	}
	.contact{
		padding-top: 20px;
		line-height: 33px;
		vertical-align: middle;
	}
	.name{
		display: flex;
		justify-content: space-between;
	}
	.iconfont{
		font-size: 32px;
		color: #C852AA;
	}
	.icon-duanxin_o{
		margin-right: 12px;
	}
</style>
