<template>
	<view class="member">
		<view class="userInfo">
			<view class="left">
				<image src="../../static/tx.jpg" class="userImg"></image>
				<view class="middle">
					<view class="name">
						adminm辅导费
					</view>
					<view class="weixin">
						微信号：fdsfs分隔符
					</view>
				</view>
			</view>

			<view class="middle">
				<view class="left">
				<u-icon name="scan" size="45"></u-icon>
				<u-button size="mini" class="editBtn">编辑</u-button>
				</view>
			</view>
		</view>

		<u-cell-group>
			<u-cell-item title="我的订单"></u-cell-item>
			<u-cell-item title="收藏夹"></u-cell-item>
			<u-cell-item title="红包卡卷"></u-cell-item>
			<u-cell-item title="收货地址"></u-cell-item>
			<u-cell-item title="账户安全"></u-cell-item>
			<u-cell-item title="切换账号"></u-cell-item>
			<u-cell-item title="退出登录"></u-cell-item>
		</u-cell-group>
		

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.member {
		.userInfo {
			background-color: white;
			padding: 20rpx;
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
			}

			.userImg {
				border-radius: 50%;
				width: 100rpx;
				height: 100rpx;
			}

			.middle {
				align-self: center;
				margin-left: 20rpx;
			}


			.name {
				font-size: 30rpx;
				font-weight: bold;
			}

			.weixin {
				color: #909399;
			}
			
			.editBtn{
				margin-left: 10rpx;
			}

		}
	}
</style>
