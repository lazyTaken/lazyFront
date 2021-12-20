<template>
	<view>
		<view class="list">
			<text class="list_txt">学号</text>
			<text class="user_txt">{{studentId}}</text>
		</view>
		<view class="list">
			<text class="list_txt">姓名</text>
			<view >
				<input :value="userName"  class="userName_txt"
				:class="{userName_txt_focus:isFocused}" @focus="changeIsFocused"
				@blur="userNameModification" auto-blur:true />
			</view>
			
		</view>
		<view class="list" @click="changeHeadPictureSrc">
			<text class="list_txt">头像</text>
			<view style="position: absolute;right: 60rpx;">
				<image :src="headPictureSrc" class="headPicture"></image>
			</view>
			<view style="position: absolute;right: 20rpx;">
				<image src="../../static/rightArrow.png" 
				style="width: 30rpx;height: 30rpx;" ></image>
			</view>

		</view>
		<view class="list" @click="changePhone">
			<text class="list_txt">手机</text>
			<text class="user_txt">{{phone}}</text>
			<view style="position: absolute;right: 20rpx;">
				<image src="../../static/rightArrow.png" style="width: 30rpx;height: 30rpx;"></image>
			</view>

		</view>


		<view class="list" @click="passwordM">
			<text class="list_txt">密码</text>
			<text class="user_txt">******</text>
			<view style="position: absolute;right: 20rpx;">
				<image src="../../static/rightArrow.png" style="width: 30rpx;height: 30rpx;"></image>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isFocused:false,
				hP: "../../static/mine/headPicture.png",
				headPictureSrc:uni.getStorageSync("photoSrc"),
				userName:uni.getStorageSync("user_name"),
				phone:uni.getStorageSync("phone"),
				studentId:uni.getStorageSync("stu_id"),
			}
		},
		methods: {
			userNameM() {
				console.log("修改昵称");
			},
			headPictureM() {
				console.log("修改头像");
			},
			changePhone() {
				console.log("修改手机");
				uni.navigateTo({
					url:"phoneModification",
				})
			},
			passwordM() {
				console.log("修改密码");
				uni.navigateTo({
					url:"passwordModification"
				})
			},
			changeIsFocused(){
				// console.log("我想改姓名输入框中的样式");
				this.isFocused = true;
			},
			async userNameModification(e){
				this.isFocused = false;
				// console.log(e.detail.value);
				//判断是否更改了昵称
				if(this.userName != e.detail.value){//如果更改了		
					//向后端提交申请
					const res = await this.$myRequest({
						url:'/user/alterName',
						data:{
							id:this.studentId,
							name:e.detail.value
						}
					})
					console.log("这是修改姓名" + typeof(res.data));

					if(res.data.success == 1){
						this.userName = e.detail.value;
						uni.setStorageSync("user_name",this.userName);
						uni.showToast({
							title:"修改姓名成功",
						})
					}else{
						uni.showToast({
							title:"修改姓名失败",
							icon:"error"
						})
					}
					
					
				}
				
			},
			changeHeadPictureSrc(){
				uni.chooseImage({
					count:1,
					sizeType:'compressed',
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						//此时应该向后端提交申请
						uni.uploadFile({
							url: this.consturl + '/user/file',
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								phone: this.phone,
							},
							success: (uploadFileRes) => {
								//如果成功
								const res = JSON.parse(uploadFileRes.data);	
								// console.log(success);
								if(res.success == 1){
									this.headPictureSrc = tempFilePaths[0];
							
									uni.showToast({
										title:"修改头像成功",
									})
								}else{
									uni.showToast({
										title:"修改头像失败",
										icon:"error"
									})
								}
							},
							fail(err) {
								uni.showToast({
									title:"接口请求失败",
									icon:"error"
								})
							}
						})
	
					}
				})
			},
			// userNameModification(e){
			// 	// console.log(e.detail);
			// 	this.userName = e.detail.value;
			// }
		}
	}
</script>

<style>
	.list {
		height: 100rpx;
		margin: 20rpx;
		display: flex;
		border-bottom: 1px solid #d9d9d9;
		/* text-align: center; */
		align-items: center;
	}

	.list_icon {
		height: 40rpx;
		width: 40rpx;
	}

	.list_txt {
		margin-left: 20rpx;
		font-size: 15px;
		text-align: center;
		font-family: PingFangSC-bold;
	}

	.user_txt {
		margin-left: 20rpx;
		font-size: 15px;
		text-align: center;
		font-family: PingFangSC-bold;
		color: #d9d9d9;
	}

	.headPicture {
		margin: 5px;
		width: 88rpx;
		height: 88rpx;
		border-radius: 500px;
		border: 2px solid rgba(255, 255, 255, 100);
	}
	.userName_txt{
		margin-left: 20rpx;
		font-size: 15px;
		font-family: PingFangSC-bold;
		color: #d9d9d9;
	}
	.userName_txt_focus{
		margin-left: 20rpx;
		font-size: 15px;
		font-family: PingFangSC-bold;
		color: black;
	}
</style>
