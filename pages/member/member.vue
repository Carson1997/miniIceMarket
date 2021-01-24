<template>
	<view class="member">
		<view class="userInfo">
			<view class="left" v-if="userInfo.nickName">
					<image :src="userInfo.avatarUrl" class="userImg"></image>
					<view class="middle">
						<view class="name">
							{{userInfo.nickName}}
						</view>
						<!-- 	<view class="weixin">
						微信号：786952046
					</view> -->
					</view>					
			</view>
			
			<view class="left" v-else>
				<u-icon name="weixin-fill" color="#1AAD19" size="60"></u-icon>
				<!-- <image src="../../st" class="userImg"></image> -->
				<view class="middle">
					<u-button open-type="getUserInfo" size="mini" @getuserinfo="login" :custom-style="minBtn">登录/注册</u-button>
				</view>
			</view>

			<view class="middle">
				<view class="left">
					<u-icon name="scan" color="#909399" size="45" style="margin-right: 20rpx;"></u-icon>
					<!-- <u-button size="mini" class="editBtn">设置</u-button> -->
					<u-icon name="setting" color="#909399" size="45"></u-icon>
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
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				minBtn: {
					color: "white",
					backgroundColor: "#ff5500"
				},
			}
		},
		computed: {
			...mapState(["userInfo"]),
		},
		onLoad() {
			// this.checkLogin()
			// console.log(this.userInfo)
		},
		methods: {
			...mapMutations(['getUserInfo']),
			login(e) {
				// #ifdef MP-WEIXIN
				let userInfo = e.detail.userInfo;
				userInfo.userId = e.detail.signature;
				this.getUserInfo(userInfo)
				// #endif
				
				// #ifdef APP-PLUS
				
				// #endif
			},

		}
	}
</script>

<style scoped lang="scss">
	.member {
		.minBtn {
			color: white;
			background-color: $minColor;
		}

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

			.editBtn {
				margin-left: 10rpx;
			}

		}
	}
</style>
