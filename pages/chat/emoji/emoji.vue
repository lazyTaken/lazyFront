<template>
	<view class="emoji">
		<view class="emoji-line" v-for="(line,i) in emoji" :key="i">
			<view class="emoji-line-item" v-for="(item,index) in line" :key="index" @tap="clickEmoji(item)">{{item}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				emoji:[
					['😀','😁','😂','🤣','😃','😄','😅','😆'],
					['😉','😊','😋','😎','😍','😘','😚','🙂'],
					['🤗','🤔','😐','🙄','😣','😥','😏','😯'],
					['😪','😌','😜','😝','🤤','😒','😓','😔'],
					['😕','🙃','🤑','😲','🙁','😖','😟','😢'],
					['😭','😧','😨','😩','😬','😰','😱','😳'],
					['😵','😡','😷','🤡','🤓','😈','💩','💀'],
				]
			}
		},
		methods: {
			clickEmoji:function(e){
				this.$emit('emotion',e);
			}
		}
	}
</script>

<style lang="scss">
	.emoji{
		width:100%;
		height:260px;
		padding:8px 6px;
		box-sizing:border-box;
		overflow: hidden;
		overflow-y: auto;
		.emoji-line{
			display:flex;
			.emoji-line-item{
				flex:1;
				text-align: center;
				font-size: 20px;
				line-height: 34px;
			}
		}
	}

</style>
