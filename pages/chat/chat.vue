<template>
	<view class="content">
		<scroll-view class="chat" scroll-y="true" :scroll-into-view="scrollToView" >
			<view class="chat-main" >
				<view class="chat-ls" v-for="(item,index) in msgs" :key="index" :id="'msgs'+item.tip">
					<view class="chat-time">{{changeTime(item.time)}}</view>
					<view class="msg-m msg-left" v-if="item.id!='001'">
						<image src='./001_img.png' class="user-img" ></image>
						<view class="massage">
							<view class="msg-text">{{item.message}}</view>
						</view>
					</view>
					<view class="msg-m msg-right" v-else>
						<image src="./001_img.png" class="user-img"></image>
						<view class="massage">
							<view class="msg-text">{{item.message}}</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="submit">
			<view class="submit-chat">
				<textarea auto-height="true" class="chat-send btn" v-model="onemessage"></textarea>
				<view class="bt-img" @tap="showemoji">
					<image src="../../static/face.png"></image>
				</view>
				<button  style="width: 130rpx; background-color: #C852AA; font-size: 30rpx;"@tap="send">发送</button>
			</view>
			<view class="emoji" :class="{displaynone:!isemoji}">
				<emoji @emotion="emotion"></emoji>
			</view>
		</view>
	</view>
</template>

<script>
	import emoji from './emoji/emoji.vue';
	import datas from '../../js/time.js'
	export default {
		data() {
			return {
				opposite: '',//对方名字
				socketOpen: false,
				socketTask: null,
				isemoji:false,
				scrollToView:'',
				onemessage: '',
				msgs:[
					{
						id:'001',
						message:'这是我说的话。',
						time:new Date()-1000*20*30*30*30*30,
						tip:0,
					},
					{
						id:'002',
						message:'这是别人说的话。',
						time:new Date()-1000*20*30*30*30,
						tip:1,
					},
					{
						id:'001',
						message:'我说的话特别特别特别特别特别特别长。',
						time:new Date()-1000*20*30*30*5,
						tip:2,
					},
					{
						id:'001',
						message:'我说的别长。',
						time:new Date()-1000*20*30*30,
						tip:3,
					},
					{
						id:'002',
						imgurl:'002_img.png',
						message:'这是别人说的话。',
						types:0,   
						time:new Date()-1000*20*30,
						tip:4,
					},
					{
						id:'002',
						message:'我说的话特别特别长。',
						time:new Date()-1000*20*10,
						tip:5,
					},
					{
						id:'002',
						message:'这是别人说的话。',
						time:new Date()-1000*20*30*30*30,
						tip:6,
					},
					{
						id:'002',
						message:'这是别人赴南非分这是别人赴南非分解为发窘说的话这是别人赴南非分解为发窘说的话这是别人赴南非分解为发窘说的话这是别人赴南非分解为发窘说的话这是别人赴南非分解为发窘说的话解为发窘说的话。',
						time:new Date()-1000*20*30*30*30,
						tip:7,
					},
					{
						id:'002',
						message:'这是别人说的话。',
						time:new Date()-1000*20*30*30*30,
						tip:8,
					},
					{
						id:'002',
						message:'这是别人说的话。',
						time:new Date()-1000*20*30*30*30,
						tip:9,
					},
				],
			}
		},
		onLoad: function (options) {//接收参数并置标题
			if(options!==null){
				this.opposite = options.acceptername
			}
			uni.request({//请求对方头像，存在001_img.png和002_img.png
				url:'',
				method:'GET',
				data:{phone: options.accepterphone},
				success: (res) => {
					if(res.statusCode===200){
						
					}
				},
			})
			let len=this.msgs.length
			this.scrollToView='msgs'+this.msgs[len-1].tip
			uni.connectSocket({//创建websocket连接
				url:'ws://82.157.123.54:9010/ajaxchattest',
				success: (data) => {
					console.log("创建成功！")
					console.log(data)
				}
			})
			uni.onSocketMessage((res)=>{
				console.log('收到服务器内容：' + res.data);
				let len=this.msgs.length
				let data={
					id:'002',
					message:res.data,
					time:new Date(),
					tip:len,
				}
				this.msgs.push(data)
			})
		},
		
		onReady() {//修改标题为接单者
			uni.setNavigationBarTitle({ title: this.opposite })
		},
		components:{
			emoji
		},
		methods: {
			changeTime:function(date){//处理时间
				return datas.dateTime(date)
			},
			showemoji:function(){//点击笑脸切换隐藏状态
				this.isemoji = !this.isemoji
			},
			emotion:function(e){//接收表情
				this.onemessage = this.onemessage + e
			},
			send:function(){//发送信息，自己输入的信息压入信息列表
				if(this.onemessage.length>0){
					let len=this.msgs.length
					let data={
						id:'001',
						message:this.onemessage,
						time:new Date(),
						tip:len,
					}
					this.msgs.push(data)
					this.$nextTick(function(){//让其触底显示最后一条信息
						this.scrollToView='msgs'+len
					})
					let msg=this.onemessage
					this.onemessage=''
					//调用socket
					console.log(msg)
					uni.sendSocketMessage({
						data: msg,
					})
				}
			},
		}
	}
</script>
	
<style lang="scss">
	.content{
		background-color:#F0F0F0;
	}
	.top-bar{
		width:100%;
		background:#FFFFFF;
		border-bottom:1px solid #c8c7cc;
		display: flex;
		height: 30px;
	}
	.top-bar-left{
        left: 10px;
        top: 27px;
        width: 30px;
        height: 30px;
		margin-top: 4px;
		image{
			width: 25px;
			height: 25px;
		}
	}
	.top-bar-center{
		margin-top: 4px;
		margin-left: 60rpx;
		width: 93%;
		font-family: PingFangSC-regular;
		text-align: center;
	}
	.top-bar-right{
		margin-top: 6px;
		margin-right: 5px;
		text{
			width: 30px;
			height: 30px;
		}
	}
	.chat{
		height: 673px;
		.chat-main{
			padding-left:10px;
			padding-right:10px;
			padding-top:20px;
			display:flex;
			flex-direction: column;
		}
		.chat-ls{
			.chat-time{
				font-size: 12px;
				font-weight:400;
				color:rgba(39,40,50,0.3);
				line-height: 34px;
				padding:0 0;
				text-align: center;
			}
			.msg-m{
				display: flex;
				padding:10px 0;
				.user-img{
					flex:none;
					width:40px;
					height:40px;
					border-radius:10px;
				}
				.message{
					flex:auto;
					max-width: 240px;
				}
				.msg-text{
					font-size:16px;
					font-weight:400;
					font-family: PingFangSC-regular;
					color:rgba(39,40,50,1);
					line-height:22px;
					padding: 9px 12px;
				}
			}
			.msg-left{
				flex-direction: row;
				.msg-text{
					margin-left:16rpx;
					margin-right:80rpx;
					background-color: #FFFFFF;
					border-radius: 0rpx 40rpx 40rpx 40rpx;
				}
			}
			.msg-right{
				flex-direction: row-reverse;
				.msg-text{
					margin-right:16rpx;
					margin-left:80rpx;
					background-color: #C852AA;
					border-radius: 40rpx 0rpx 40rpx 40rpx;
				}
			}
		}
	}
	.submit{
		background: #F9F9F9;
		border-top: 1px solid #c8c7cc;
		width:100%;
		position:fixed;
		bottom:0;
		z-index:100;
		padding-bottom:env(safe-area-inset-bottom);
	}
	.displaynone{
		display:none;
	}
	.submit-chat{
		width:100%;
		display:flex;
		align-items:flex-end;
		box-sizing: border-box;
		padding:7px 7px;
		image{
			width:28px;
			height:28px;
			margin:0 5px;
			flex:auto;
		}
		.btn{
			flex:auto;
			background-color:  #FFFFFF;
			border-radius: 5px;
			padding: 5px;
			max-height: 80px;
			margin:0 5px;
		}
	}
	.emoji{
		width:100%;
		height:260px;
		background:rgba(236,237,238,1);
		box-shadow:0px -1px 0px 0px rgba(0,0,0,0.1);
	}
</style>
