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
					<svg t="1637812791905" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2082" width="28" height="28"><path d="M480 480m-160 0a2.5 2.5 0 1 0 320 0 2.5 2.5 0 1 0-320 0Z" p-id="2083" fill="#1778FC"></path></svg>
					<text>南理工校医院门口菜鸟驿站</text>
				</view>
				<view class="towhere">
					<svg t="1637812791905" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2082" width="28" height="28"><path d="M480 480m-160 0a2.5 2.5 0 1 0 320 0 2.5 2.5 0 1 0-320 0Z" p-id="2083" fill="#08C050"></path></svg>
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
					<svg t="1637812791905" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2082" width="28" height="28"><path d="M480 480m-160 0a2.5 2.5 0 1 0 320 0 2.5 2.5 0 1 0-320 0Z" p-id="2083" fill="#1778FC"></path></svg>
					<text>南理工校医院门口菜鸟驿站</text>
				</view>
				<view class="towhere">
					<svg t="1637812791905" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2082" width="28" height="28"><path d="M480 480m-160 0a2.5 2.5 0 1 0 320 0 2.5 2.5 0 1 0-320 0Z" p-id="2083" fill="#08C050"></path></svg>
					<text>慧质阁</text>
				</view>
			</view>
			<svg t="1637839206187" class="plus" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9242" width="40" height="40"><path d="M514.048 62.464q93.184 0 175.616 35.328t143.872 96.768 96.768 143.872 35.328 175.616q0 94.208-35.328 176.128t-96.768 143.36-143.872 96.768-175.616 35.328q-94.208 0-176.64-35.328t-143.872-96.768-96.768-143.36-35.328-176.128q0-93.184 35.328-175.616t96.768-143.872 143.872-96.768 176.64-35.328zM772.096 576.512q26.624 0 45.056-18.944t18.432-45.568-18.432-45.056-45.056-18.432l-192.512 0 0-192.512q0-26.624-18.944-45.568t-45.568-18.944-45.056 18.944-18.432 45.568l0 192.512-192.512 0q-26.624 0-45.056 18.432t-18.432 45.056 18.432 45.568 45.056 18.944l192.512 0 0 191.488q0 26.624 18.432 45.568t45.056 18.944 45.568-18.944 18.944-45.568l0-191.488 192.512 0z" p-id="9243" fill="#C852AA" @click="addAssign()"></path></svg>
			
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
	.icon{
		vertical-align: middle;
	}
	.assign_item{
		margin: 10px;
		padding: 5px;
		border-bottom-color: #EED2EE;
		border-bottom-style: double;
	}
	.plus{
		position: fixed;
		right: 70rpx;
		bottom: 300rpx;
	}
	
</style>
