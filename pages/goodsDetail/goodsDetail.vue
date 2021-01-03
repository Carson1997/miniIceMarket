<template>
	<view class="pages goodsDetail">
		<scroll-view class="wrap" scroll-y :style="{height: height+'px'}">
			<!-- 轮播图 -->
			<swiper indicator-dots circular autoplay>
				<swiper-item v-for="item in detail.swipers" :key="item.id" @click="seeImg(item)">
					<image :src="item"></image>
				</swiper-item>
			</swiper>

			<view class="goods_item">
				<view class="info0">
					<view class="price">
						<text>￥{{detail.price}}</text>
						<text v-if="detail.orPrice">￥{{detail.orPrice}}</text>
					</view>
					<view class="quantity">库存：{{detail.quantity}}件</view>
				</view>

				<view class="name">
					{{detail.title}}
				</view>

				<view class="info1">
					<view>运费：包邮</view>
					<view>月销售：{{detail.sold}}件</view>
				</view>

				<view class="info2">服务：
					<u-tag v-for="item in detail.service" :text="item" type="error" class="u-tag" :key="item" />
				</view>
			</view>

			<view class="params">
				<view class="title" @click="seeParams">
					参数
					<u-icon :name="iconShow?'arrow-down':'arrow-up'" color="#999"></u-icon>
				</view>
				<view v-for="item in detail.goods_params" :key="item.label" class="p1 h1" v-if="ifSee">
					<view class="label">{{item.label}}</view>
					<view class="value">{{item.value}}</view>
				</view>
			</view>

			<view class="shop">
				<view class="s1">
					<image class="imgS" :src="detail.shopImg"></image>
					<view class="shopName">{{detail.shopName}}</view>
				</view>
				<view class="s2">
					<view>宝贝描述:<text>{{detail.goodsScore}}</text></view>
					<view>卖家服务:<text>{{detail.shopScore}}</text></view>
					<view>物流服务:<text>{{detail.logisticsScore}}</text></view>
				</view>
			</view>

			<image v-for="item in detail.swipers" :key="item.id" :src="item" class="detailImg"  @click="seeImg(item)"></image>

		</scroll-view>

		<goods_nav class="goods_nav" :cart_num="buyNum" @addCartClick="addCart" @buyClick="buy" @collectClick="collect"></goods_nav>

		<u-popup border-radius="10" v-model="downShow" length="50%" mode="bottom" closeable>
			<view class="downDiv">
				<view class="d1">
					<image :src="detail.img" class="ximg"></image>
					<view>
						<view class="price">
							<text>￥{{detail.price}}</text>
							<text v-if="detail.orPrice">￥{{detail.orPrice}}</text>
						</view>
						<view class="quantity">库存：{{detail.quantity}}件</view>
					</view>
				</view>
				<view class="name">
					{{detail.title}}
				</view>

				<view class="info0">
					<view>购买数量：</view>
					<view>
						<u-number-box v-model="showNum" :max="detail.quantity|changeNum" size="30"></u-number-box>
					</view>
				</view>

			</view>
			<button type="warn" class="cur" @click="confirm">确定</button>
		</u-popup>

	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapMutations
	} from 'vuex';
	import goods_nav from '../../components/goodsDetail/goods_nav.vue'
	export default {
		components: {
			goods_nav
		},
		computed: {
			...mapState(["cart", "collection", "userInfo"]),
			userId: function() {
				return this.userInfo.userId;
			},
		},
		filters: {
			changeNum: function(data) {
				return parseInt(data)
			}
		},
		data() {
			return {
				height: 0,
				ifSee: false,
				iconShow: true,
				downShow: false,
				list: [{
					text: '点赞',
					color: 'blue',
					fontSize: 28,
					subText: '感谢您的点赞'
				}, {
					text: '分享'
				}, {
					text: '评论'
				}],
				detail: {
					"img": '',
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
				},
				buyNum: 0,
				showNum: 1,
			}
		},
		onLoad(option) {
			this.detail.goods_id = option.goods_id;
			this.checkCart()
			this.getGoodsData();
			uni.getSystemInfo({
				success: data => {
					let statusBarHeight = data.statusBarHeight;
					let windowHeight = data.windowHeight;
					let height = windowHeight - 54;
					this.height = height;
				}
			})
		},
		onPullDownRefresh() {
			setTimeout(() => {
				this.getGoodsData(() => {
					uni.stopPullDownRefresh()
				})
			}, 1000)
		},
		methods: {
			...mapMutations(['addCart', 'addcollect']),
			async getGoodsData(callBack) {
				let send = {
					goods_id: this.detail.goods_id
				};
				// #ifdef H5
				this.$Request({
					url: this.$Interface.goodsDetail,
					data: send
				}).then(res => {
					this.$CheckStatus(res, () => {
						let data = res.data;
						let detail = data.goods_list.filter(item => {
							if (item.goods_id == this.detail.goods_id) {
								return item
							}
						})[0];
						this.detail.img = detail.img;
						this.detail.swipers = detail.swipers.split(';');
						this.detail.title = detail.title;
						this.detail.price = detail.price;
						this.detail.orPrice = detail.orPrice;
						this.detail.sold = detail.sold;
						this.detail.quantity = detail.quantity;
						this.detail.service = detail.service.split('，');
						this.detail.shopImg = detail.shopImg;
						this.detail.shopName = detail.shopName;
						this.detail.goodsScore = detail.goodsScore;
						this.detail.shopScore = detail.shopScore;
						this.detail.logisticsScore = detail.logisticsScore;
						this.detail.goods_params = detail.goods_params;
						this.detail.shopId = detail.shopId;
						callBack && callBack();
					})
				})
				// #endif

				// #ifdef MP-WEIXIN
				let res = require('@/static/json/goodsDetail.json');
				let data = res.data;
				let detail = data.goods_list.filter(item => {
					if (item.goods_id == this.detail.goods_id) {
						return item
					}
				})[0];
				this.detail.img = detail.img;
				// this.detail.swipers = detail.img.split(';');
				this.detail.swipers = detail.swipers.split(';');
				this.detail.title = detail.title;
				this.detail.price = detail.price;
				this.detail.orPrice = detail.orPrice;
				this.detail.sold = detail.sold;
				this.detail.quantity = detail.quantity;
				this.detail.service = detail.service.split('，');
				this.detail.shopImg = detail.shopImg;
				this.detail.shopName = detail.shopName;
				this.detail.goodsScore = detail.goodsScore;
				this.detail.shopScore = detail.shopScore;
				this.detail.logisticsScore = detail.logisticsScore;
				this.detail.goods_params = detail.goods_params;
				this.detail.shopId = detail.shopId;
				callBack && callBack();
				// #endif

			},
			checkCart() {
				if (this.cart[this.detail.goods_id]) {
					let num = this.cart[this.detail.goods_id].buyNum;
					this.buyNum = num;
					this.showNum = num;
				}
			},
			seeImg(current) {
				let urls = this.detail.swipers;
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
			addCart() {
				this.downShow = true;
				this.btnType = 'addCart';
			},
			buy() {
				this.downShow = true;
				this.btnType = 'buy';
			},
			confirm() {
				this.downShow = false;
				if (this.btnType == "addCart") {
					let goods_id = this.detail.goods_id;
					this.buyNum = this.showNum;
					let buyNum = this.buyNum;
					let price = this.buyNum * this.detail.price;
					let data;
					if (buyNum > 0) {
						if (this.cart.hasOwnProperty(goods_id) == false) {
							this.cart[goods_id] = {
								detail: this.detail,
								buyNum: buyNum,
							};
						} else {
							this.cart[goods_id].buyNum = buyNum;
						}
						data = this.cart[goods_id];
					}
					if (buyNum == 0) {
						if (this.cart.hasOwnProperty(goods_id) == true) {
							delete this.cart[goods_id]
						}
						data = null;
					}

					// #ifdef H5
					this.addCartApi(data);
					// #endif
				}
				if (this.btnType == "buy") {

				}
			},
			addCartApi(data) {
				let send = {
					goods_id: this.detail.goods_id,
					data: data,
					userId: this.userId,
					type: 'add'
				};
				this.$Request({
					url: this.$Interface.upadateCarts,
					data: send
				}).then(res => {
					this.$CheckStatus(res)
				})
			},
			collect(ifCollect) {
				let goods_id = this.detail.goods_id;
				if (ifCollect) {
					this.collection[goods_id] = this.detail;
				} else {
					delete this.collection[goods_id];
				}
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
		}

		.info0 {
			display: flex;
			justify-content: space-between;
			margin-bottom: 10rpx;
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

		.goods_nav {
			position: fixed;
			bottom: 0;
			width: 100%;
		}

		.detailImg {
			width: 750rpx;
			height: 750rpx;
		}

		.downDiv {
			padding: 10rpx;

			.d1 {
				display: flex;
				align-items: flex-end;
			}

			.ximg {
				width: 200rpx;
				height: 200rpx;
				margin-right: 20rpx;
			}
		}

		.cur {
			position: fixed;
			bottom: 10rpx;
			left: 0;
			right: 0;
			width: 98%;
			margin: auto;
		}




	}
</style>
