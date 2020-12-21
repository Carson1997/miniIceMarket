<template>
	<view class="pages goodsDetail">
		<scroll-view class="wrap" scroll-y :style="{height: height+'px'}">
			<!-- 轮播图 -->
			<swiper indicator-dots circular autoplay>
				<swiper-item v-for="item in swipers" :key="item.id" @click="seeImg(item)">
					<image :src="item"></image>
				</swiper-item>
			</swiper>

			<view class="goods_item">
				<view class="info0">
					<view class="price">
						<text>￥{{price}}</text>
						<text v-if="orPrice">￥{{orPrice}}</text>
					</view>
					<view class="quantity">库存：{{quantity}}件</view>
				</view>

				<view class="name">
					{{title}}
				</view>

				<view class="info1">
					<view>运费：包邮</view>
					<view>月销售：{{sold}}件</view>
				</view>

				<view class="info2">服务：
					<u-tag v-for="item in service" :text="item" type="error" class="u-tag" :key="item" />
				</view>
			</view>

			<view class="params">
				<view class="title" @click="seeParams">
					参数
					<u-icon :name="iconShow?'arrow-down':'arrow-up'" color="#999"></u-icon>
				</view>
				<view v-for="item in goods_params" :key="item.label" class="p1 h1" v-if="ifSee">
					<view class="label">{{item.label}}</view>
					<view class="value">{{item.value}}</view>
				</view>
			</view>

			<view class="shop">
				<view class="s1">
					<image class="imgS" :src="shopImg"></image>
					<view class="shopName">{{shopName}}</view>
				</view>
				<view class="s2">
					<view>宝贝描述:<text>{{goodsScore}}</text></view>
					<view>卖家服务:<text>{{shopScore}}</text></view>
					<view>物流服务:<text>{{logisticsScore}}</text></view>
				</view>
			</view>

		</scroll-view>

		<goods_nav class="goods_nav"></goods_nav>

	</view>
</template>

<script>
	import goods_nav from '../../components/goods_nav.vue'
	export default {
		components: {
			goods_nav
		},
		data() {
			return {
				height:0,
				ifSee: false,
				iconShow: true,
				"goods_params": [],
				goods_id: '',
				swipers: [],
				title: "",
				price: "",
				orPrice: "",
				sold: "",
				quantity: "",
				service: "",
				shopImg: "",
				shopName: "",
				goodsScore: "",
				shopScore: "",
				logisticsScore: "",
			}
		},
		onLoad(option) {
			this.goods_id = option.goods_id;
			this.initLister();
			this.getGoodsData();
			uni.getSystemInfo({
				success: data=> {
					let statusBarHeight = data.statusBarHeight;
					let windowHeight = data.windowHeight;
					let height = windowHeight - 54;
					this.height = height;
				}
			})
		},
		onReady() {

		},
		onPullDownRefresh() {
			setTimeout(() => {
				this.getGoodsData(() => {
					uni.stopPullDownRefresh()
				})
			}, 1000)
		},
		methods: {
			async getGoodsData(callBack) {
				let send = {
					goods_id: this.goods_id
				};
				// #ifdef H5
				this.$Request({
					url: this.$Interface.goodsDetail,
					data: send
				}).then(res => {
					this.$CheckStatus(res, () => {
						let data = res.data;
						let detail = data.goods_list.filter(item => {
							if (item.goods_id == this.goods_id) {
								return item
							}
						})[0];
						this.swipers = detail.swipers.split(';');
						this.title = detail.title;
						this.price = detail.price;
						this.orPrice = detail.orPrice;
						this.sold = detail.sold;
						this.quantity = detail.quantity;
						this.service = detail.service.split('，');
						this.shopImg = detail.shopImg;
						this.shopName = detail.shopName;
						this.goodsScore = detail.goodsScore;
						this.shopScore = detail.shopScore;
						this.logisticsScore = detail.logisticsScore;
						this.goods_params = detail.goods_params;
						callBack && callBack();
					})
				})
				// #endif

				// #ifdef MP-WEIXIN
				let res = require('@/static/json/goodsDetail.json');
				let data = res.data;
				let detail = data.goods_list.filter(item => {
					if (item.goods_id == this.goods_id) {
						return item
					}
				})[0];
				// this.swipers = detail.swipers.split(';');
				this.swipers = detail.img.split(';');
				this.title = detail.title;
				this.price = detail.price;
				this.orPrice = detail.orPrice;
				this.sold = detail.sold;
				this.quantity = detail.quantity;
				this.service = detail.service.split('，');
				this.shopImg = detail.shopImg;
				this.shopName = detail.shopName;
				this.goodsScore = detail.goodsScore;
				this.shopScore = detail.shopScore;
				this.logisticsScore = detail.logisticsScore;
				this.goods_params = detail.goods_params;
				callBack && callBack();
				// #endif

			},
			seeImg(current) {
				let urls = this.swipers;
				uni.previewImage({
					current,
					urls,
					"indicator": "number",
					"loop": true,
				});

			},
			seeParams() {
				this.ifSee = !this.ifSee;
				this.iconShow = !this.iconShow;
			},
			initLister() {
				uni.$on('addCart', function(data) {
					console.log(data)
				})
			}

		}
	}
</script>

<style scoped lang="scss">
	.goodsDetail {
		swiper {
			width: 750rpx;
			height: 750rpx;

			image {
				height: 100%;
				width: 100%;
			}
		}

		.goods_item,
			{
			background-color: white;
			width: 100%;
			padding: 10rpx;
			margin-bottom: 20rpx;

			.info0 {
				display: flex;
				justify-content: space-between;
				margin-bottom: 10rpx;

				.price {
					color: red;
					font-size: 50rpx;

					text:nth-child(2) {
						color: #C0C0C0;
						font-size: 28rpx;
						margin-left: 10rpx;
						text-decoration: line-through;
					}
				}

				.quantity {
					align-self: flex-end;
					color: $uni-text-color-grey;
				}
			}

			.name {
				font-size: 28rpx;
				line-height: 28rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				line-height: 40rpx;
				margin-bottom: 10rpx;
			}

			.info1 {
				padding-top: 0;
				font-size: 28rpx;
				color: $uni-text-color-grey;
				display: flex;
				justify-content: space-between;
				margin-bottom: 10rpx;
			}

			.info2 {
				.u-tag {
					margin: 0 10rpx;
				}
			}
		}

		.params {
			background-color: white;
			width: 100%;
			padding: 10rpx;
			margin-bottom: 20rpx;

			.title {
				font-size: 30rpx;
				font-weight: bold;
				padding: 10rpx;
				padding-top: 0;
				display: flex;
				justify-content: space-between;
			}

			.h1 {
				border-top: $uni-text-color-grey solid 2rpx;
			}

			.p1 {
				display: flex;
				color: $uni-text-color-grey;

				.label {
					min-width: 200rpx;
				}

				view {
					padding: 10rpx;
				}


			}
		}

		.shop {
			background-color: white;
			width: 100%;
			padding: 10rpx;
			margin-bottom: 20rpx;

			.s1 {
				display: flex;
				margin-bottom: 10rpx;

				.imgS {
					width: 100rpx;
					height: 100rpx;
					border: $uni-text-color-grey solid 2rpx;
				}

				.shopName {
					align-self: center;
					margin-left: 10rpx;
					font-size: 36rpx;
				}
			}

			.s2 {
				display: flex;
				justify-content: space-between;
				margin-bottom: 10rpx;

				text {
					color: red;
				}
			}
		}

		.wrap {}

		.goods_nav {
			position: fixed;
			bottom: 0;
			width: 100%;
		}

	}
</style>
