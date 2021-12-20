<template>
	<view>
		<view style="color: #007AFF;" v-for="(item,index) in list">
			<view >
				{{index}}:{{item}}
			</view>
		</view>
		<button type="default" @click="add">添加</button>
		<view class="">
			<image src="../chat/002_img.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:["123","234","345"],
			}
		},
		methods: {
			add(){
				var list2="456";
				var list3=["111","222"]
				this.list.push(list2) 
			}
		},
		
	}
</script>
	
<style>
	
</style>
