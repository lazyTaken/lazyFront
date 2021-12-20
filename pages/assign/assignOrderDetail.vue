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
				<text>接单人员：{{acceptername}}</text>
				<text>
					<text class="iconfont icon-duanxin_o" @click="connectOnline()" ></text>
					<text class="iconfont icon-dianhua" @click="connectPhone()"></text>
				</text>
			</view>
			<view class="pay" style="margin-bottom: 30rpx;" v-if="orderDetail.robtime!==''">
				<text class="iconfont icon-weixinzhifu" @click="copywx()" v-if="accepterwx"></text>
				<text class="iconfont icon-alipay" @click="copyzfb()" style="margin-left: 20rpx;" v-if="accepterzfb"></text>
			</view>
			<view class="btn">
				<button class="btn1" :disabled="orderDetail.finishtime!==''" @click="finish()">完成</button>
				<button class="btn2" :disabled="orderDetail.finishtime!==''" @click="cancel()">取消</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderDetail:{},
				acceptername:'',
				accepterphone:'',
				accepterwx:'',
				accepterzfb:'',
			}
		},
		onLoad(options) {
			if(options!==null){
				var item = JSON.parse(options.item);
				this.orderDetail = item;
				if(this.orderDetail.robtime!==''){//请求接单者信息、支付方式
					uni.request({
						url: this.consturl+'/order/peopleInfo',
						data:{id:this.orderDetail.number},
						method:'GET',
						success: (res) => {
							if(res.statusCode===200){
								this.acceptername=res.data['accepterName']
								this.accepterphone=res.data['accepterPhone']
							}
						}
					})
					uni.request({
						url: this.consturl+'/user/payments',
						method: 'GET',
						data: {phone: this.accepterphone},
						success: (res) => {
							if(res.statusCode===200){
								this.accepterwx=res.data["微信"]
								this.accepterzfb=res.data["支付宝"]
							}
						}
					})
				}
			}
		},
		methods: {
			connectOnline(){
				uni.navigateTo({
					url:'../chat/chat'
				})
			},
			connectPhone(){
				uni.makePhoneCall({
					phoneNumber: this.accepterphone
				})
			},
			copywx(){//点击复制微信转账号,并跳转微信
				if(accepterwx==''){return}
				uni.setClipboardData({//复制到剪切板
				    data: this.accepterwx,
				    success: () =>{
						uni.showToast({	icon: 'none', title: '已复制对方微信转账号'})
				    }
				})
				if ( plus.runtime.isApplicationExist({pname: 'com.tencent.mm' }) ) {//安装了app
					plus.runtime.openURL(
						'weixin://',
						function(res) {}
					)
				}
			},
			copyzfb(){//点击复制支付宝转账号，并跳转支付宝
				if(accepterzfb==''){return}
				uni.setClipboardData({//复制到剪切板
				    data: this.accepterzfb,
				    success: function () {
				        uni.showToast({	icon: 'none', title: '已复制对方支付宝转账号', duration: 1500})
				    }
				})
				if ( plus.runtime.isApplicationExist({pname: 'com.eg.android.AlipayGphone' }) ) {//安装了app
					plus.runtime.openURL(
						'alipays://',
						function(res) {}
					)
				}
			},
			finish(){//点击完成事件
				uni.request({
					url: this.consturl+'/order/finish',
					method:'GET',
					data:{ id: this.orderDetail.number },
					success:res=>{
						if(res.statusCode===200){
							uni.showToast({icon:'success', title:"订单已完成"})
							uni.switchTab({url:'/pages/assign/assign'})
						}
					}
				})
			},
			cancel(){//取消订单
				if(this.orderDetail.taketime!==''){
					return uni.showModal({content: '对方已取件，无法取消', showCancel: false})
				}
				let nowtime = Date.parse(new Date());
				let robtime=Date.parse(new Date(this.orderDetail.robtime));
				let time_dis = (nowtime-robtime)/1000;
				if(time_dis>300){
					return uni.showModal({content: '对方接单超过5分钟，无法取消', showCancel: false})
				}
				uni.request({//可以取消
					url: this.consturl+'/order/cancel',
					method:'GET',
					data:{ id: this.orderDetail.number },
					success:res=>{
						console.log(res);
						if(res.statusCode===200){
							uni.showToast({icon: 'success', title: "订单已取消"})
							uni.switchTab({url: '/pages/assign/assign'})
						}
					}
				})
			}
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
	.icon-weixinzhifu{
		color: #08C050;
	}
	.icon-alipay{
		color: #1778FC;
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
