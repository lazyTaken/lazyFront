<template>
	<view class="content">
		<form @submit="formSubmit">
			<view class="detail">
				<view class="part">
					<text style="width: 200rpx;color: #C852AA;">快递所在地</text>
					<input type="text" placeholder="南理工校医院门口菜鸟驿站"style="padding-left:8px;width: 100%;border-radius: 10px;border: 1px solid rgba(200, 82, 170, 100);"name='fromwhere' />
				</view>
				<view class="part">
					<text style="width: 200rpx;color: #C852AA;">收货地址</text>
					<input type="text" placeholder="3栋2单元102"style="padding-left:8px;width: 100%;border-radius: 10px;border: 1px solid rgba(200, 82, 170, 100);" name='towhere' />
				</view>
				<view class="part">
					<text style="width: 200rpx;color: #C852AA;">联系人</text>
					<input type="text" placeholder="请输入您的姓名"style="padding-left:8px;width: 100%;border-radius: 10px;border: 1px solid rgba(200, 82, 170, 100);" name='assignername' />
				</view>
				<view class="part">
					<text style="width: 200rpx;color: #C852AA;">联系电话</text>
					<input type="number" placeholder="请输入您的电话号码"style="padding-left:8px;width: 100%;border-radius: 10px;border: 1px solid rgba(200, 82, 170, 100);" name='assignerphone' />
				</view>
				<view class="part">
					<text style="width: 200rpx;color: #C852AA;">收货时间</text>
					<input type="text" placeholder="2021-11-10 10:00"style="padding-left:8px;width: 100%;border-radius: 10px;border: 1px solid rgba(200, 82, 170, 100);" name='deadline' />
				</view>
			
			</view>
			<view class="detail">
				<view class="part">
					<text style="width: 180rpx;color: #C852AA;">选择类型</text>
					<picker @change="bindPickerChange" :value="index" :range="package" name='type'>
						<view>{{package[index]}}</view>
					</picker>
				</view>
				<view class="part">
					<text style="width: 180rpx;color: #C852AA;">价格</text>
					<text style="width: 300rpx;text-align: center;font-size: 18px;">{{price[index]}}</text>
				</view>
				<view class="part">
					<text style="width: 180rpx;color: #C852AA;">取件码</text>
					<input type="text" placeholder="请输入取件码"style="padding-left:8px;width: 100%;border-radius: 10px;border: 1px solid rgba(200, 82, 170, 100);" name='code' />
				</view>
				<view class="part">
					<text style="width: 180rpx;color: #C852AA;">备注</text>
					<input type="text" placeholder="请输入备注"style="padding-left:8px;width: 100%;border-radius: 10px;border: 1px solid rgba(200, 82, 170, 100);" name='addition' />
				</view>
			</view>
			<button class="submit" form-type="submit">立即下单</button>
			<view class="checkbox">
				<view>
				    <checkbox-group  @change="checkboxChange">
				        <label>
				            <checkbox color=#C852AA value="yes"/>我同意
							<text style="color: #C852AA;">《小懒代取下单协议》</text>
				        </label>
					</checkbox-group>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				package: ['小包裹（1~2kg）', '中包裹（3~5kg）', '大包裹（6~10kg）', '巨包裹（11~Nkg）'],
				price: ['￥3', '￥4', '￥6', '￥8'],
				index: 0,
				agree: '',
			}
		},
		methods: {
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
			checkboxChange: function(e){
				this.agree=e.target.value
			},
		    formSubmit: function(e) {
				if(this.agree=='yes'){
					var formdata = e.detail.value
					uni.request({
						url: this.consturl+'/',
						method: 'GET',
						data: JSON.stringify(formdata),
						success:(res)=>{
							if(res.statusCode===200){
								console.log(res.statusCode)
								uni.showToast({ icon: 'success', title: '下单成功' })
							}
						}
					})
				}
				else{
					uni.showToast({ icon :'none', title:"请先同意《小懒代取下单协议》！" });
				}
			},
		}
	}
</script>

<style lang="scss">
	.detail {
		margin: 14px;
		padding: 10px;
		border: solid 1px #BBBBBB;
		font-size: 14px;
		text-align: left;
	}
	.part {
		display: flex;
		margin-bottom: 10px;
	}
	.submit {
		width: 60%;
		height: 30%;
		border-radius: 4rpx;
		background-color: #C852AA;
		font-size: 30rpx;
		color: #FFFFFF;
		font-weight: normal;
		margin-top: 50rpx;
	}
	.checkbox {
		margin: 5px;
		font-size: 25rpx;
		text-align: center;
	}
</style>