<template>
	<view class="content">
		<view class="detail">
			<view>
				<text class="type">小包裹{{nbsp}}</text>
				<text>下单价格：3元</text>
			</view>
			<view>下单时间：2021-11-10 10:00</view>
			<view>订单编号：xxxxxxxxxxxx</view>
			<view>快递所在地：南理工校医院门口菜鸟驿站</view>
			<view>收货地址：慧质阁</view>
			<view>预约时间：2021-11-10 10:00</view>
			<view>取货码：277-23-2399</view>
			<view>送达时间：2021-11-10 10:00</view>
			<view>订单完成时间：2021-11-10 10:00</view>
			<view>备注：无</view>
		</view>
		<view class="contact">
			<view class="name">
				<text>接单人员：XXX</text>
				<text>
					<text class="iconfont icon-duanxin_o" @click="connectOnline()"></text>
					<text class="iconfont icon-dianhua" @click="connectPhone(phoneNumber)"></text>
				</text>
			</view>
			<view class="btn">
				<button class="btn1" :disabled="isDone" @click="done()">完成</button>
				<button class="btn2" :disabled="isDone" @click="cancel()">取消</button>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				nbsp:" ",
				isDone:false,//true表示已经完成，禁用按钮
				phoneNumber:"19938597538"
			}
		},
		methods: {
			connectOnline(){
				uni.navigateTo({
					url:"../test/test",//跳转到聊天
				})
			},
			connectPhone(phoneNumber){
				uni.makePhoneCall({
					phoneNumber: phoneNumber //仅为示例
				})
			},
			done(){//点击完成事件
				
			},
			cancel(){//点击取消事件
				
			},
		},
		onLoad: function (option) {//根据传递的参数决定是否禁用按钮
		    this.isDone=option.isDone
		}
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
	button::after {
	  border: none;
	}
	button {
	  color: #FFFFFF;
	  width: 80px;
	  height: 35px;
	  line-height: 35px;
	}
	.btn{
		display: flex;
	}
	.btn1{
		background-color: #C852AA;
		margin-left: 120rpx;
	}
	.btn2{
		background-color: #D9C342;
		margin-right: 120rpx;
	}
</style>
