<template>
	<view class="cart">

		<view v-for="(item,index) in cart_arr" :key="index" class="container" v-if="cart_arr.length > 0">
			<view class="list">
				<view class="row">
					<u-checkbox v-model="item.checked" @change="shopCheckboxChange(index)"><text class="shopName">{{item.shopName}}</text></u-checkbox>
				</view>

				<u-swipe-action v-for="(goods,gindex) in item.goods" :key="gindex" :options="options" :index="gindex" @click="deleteClick(index,gindex,goods.detail.goods_id)"
				 @open="open(index,gindex)" :show="goods.deleteShow">

					<view class="row">
						<view class="checkbox">
							<u-checkbox v-model="goods.checked" shape="circle" @change="goodsCheckboxChange(index,gindex)"></u-checkbox>
						</view>
						<view>
							<image :src="goods.detail.img" class="goodsImg" @click="goGoodsDetail(goods.detail.goods_id)"></image>
						</view>
						<view class="goodsInfo">
							<view class="goodsName" @click="goGoodsDetail(goods.detail.goods_id)">
								{{goods.detail.title}}
							</view>
							<view class="goodsRight">
								<view class="goodsPrice">￥{{goods.detail.price}}</view>
								<view>
									<u-number-box v-model="goods.buyNum" :max="goods.detail.quantity|changeNum" :min="1" size="30"></u-number-box>
								</view>
							</view>
						</view>
					</view>


				</u-swipe-action>

			</view>
		</view>

		<u-empty mode="car" v-if="cart_arr.length == 0"></u-empty>

		<view class="bottom">
			<view>
				<u-checkbox v-model="selectAll" @change="allCheckboxChange()">全选</u-checkbox>
			</view>
			<view>
				合计：<text class="goodsPrice">￥{{allPrice}}</text>
				<u-button type="error" size="medium" class="payBtn">结算</u-button>
			</view>
		</view>

	</view>

</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		computed: {
			...mapState(['cart', "userInfo"]),
			userId: function() {
				return this.userInfo.userId;
			},
			allPrice: function() {
				let allPrice = 0;
				this.cart_arr.map((val, idx) => {
					val.goods.map((gval, gidx) => {
						if (gval.checked) {
							allPrice += (gval.buyNum * gval.detail.price);
						}
					})
				})
				return allPrice;
			}
		},
		filters: {
			changeNum: function(data) {
				return parseInt(data)
			}
		},
		data() {
			return {
				list: [{
						name: 'apple',
						checked: false,
						disabled: false
					},
					{
						name: 'banner',
						checked: false,
						disabled: false
					},
					{
						name: 'orange',
						checked: false,
						disabled: false
					}
				],
				cart_arr: [],
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d',
					}
				}],
				selectAll: false,
			}
		},
		onLoad() {},
		onHide() {
			// #ifdef H5
			this.upadateCarts();
			// #endif
		},
		onShow() {
			this.initCart()
		},
		onPullDownRefresh() {
			setTimeout(() => {
				this.initCart()
				uni.stopPullDownRefresh()
			}, 1000)
		},
		methods: {
			initCart() {
				let arr = Object.values(this.cart);
				let new_arr = [];
				for (let i in arr) {
					let d = arr[i];
					d.deleteShow = false;
					d.checked = false;
					let shopId = d.detail.shopId;
					let shopName = d.detail.shopName;
					if (new_arr.hasOwnProperty(shopId) == false) {
						new_arr[shopId] = {
							goods: [],
							checked: false,
							shopName: shopName
						}
					}
					new_arr[shopId].goods.push(d)
				}
				this.cart_arr = Object.values(new_arr);
			},
			deleteClick(shopIndex, goodsIndex,goods_id) {
				let arr = JSON.parse(JSON.stringify(this.cart_arr));
				arr[shopIndex].goods.splice(goodsIndex, 1);
				if (arr[shopIndex].goods.length == 0) {
					arr.splice(shopIndex, 1);
				}
				this.cart_arr = arr;
				delete this.cart[goods_id];
			},
			open(shopIndex, goodsIndex) {
				let arr = JSON.parse(JSON.stringify(this.cart_arr));
				arr.map((val, idx) => {
					val.goods.map((gval, gidx) => {
						if (idx == shopIndex && gidx == goodsIndex) {
							gval.deleteShow = true;
						} else {
							gval.deleteShow = false;
						}
					})
				})
				this.cart_arr = arr;
			},
			shopCheckboxChange(index) {
				this.$nextTick(function() {
					let arr = JSON.parse(JSON.stringify(this.cart_arr));
					let checked = arr[index].checked;
					arr[index].goods.map((gval, gidx) => {
						gval.checked = checked;
					});
					this.cart_arr = arr;

					let ifAllShop = 0;
					arr.map((shop) => {
						if (shop.checked == checked) {
							ifAllShop++;
						}
					})
					if (ifAllShop == arr.length) {
						this.selectAll = checked;
					} else {
						this.selectAll = false;
					}
				})
			},
			goodsCheckboxChange(shopIndex, goodsIndex) {
				this.$nextTick(function() {
					let arr = JSON.parse(JSON.stringify(this.cart_arr));
					let currentChecked = arr[shopIndex].goods[goodsIndex].checked;
					let ifAll = 0;
					arr[shopIndex].goods.map((gval, gidx) => {
						if (gval.checked == currentChecked) {
							ifAll++;
						}
					});
					if (ifAll == arr[shopIndex].goods.length) {
						arr[shopIndex].checked = currentChecked;
					} else {
						arr[shopIndex].checked = false;
					}
					
					let that = this;
					checkedAll();
					function checkedAll() {
						let ifAllShop = 0;
						arr.map((shop) => {
							if (shop.checked == currentChecked) {
								ifAllShop++;
							}
						})
						if (ifAllShop == arr.length) {
							that.selectAll = currentChecked;
						} else {
							that.selectAll = false;
						}
					}

					this.cart_arr = arr;
				})
			},
			allCheckboxChange() {
				this.$nextTick(function() {
					let allChecked = this.selectAll;
					let arr = JSON.parse(JSON.stringify(this.cart_arr));
					arr.map((val, idx) => {
						val.checked = allChecked;
						val.goods.map((gval, gidx) => {
							gval.checked = allChecked;
						})
					})
					this.cart_arr = arr;
				})
			},

			goGoodsDetail(id) {
				uni.navigateTo({
					url: '/pages/goodsDetail/goodsDetail?goods_id=' + id
				})
			},
			
			upadateCarts() {
				let send = {
					data: this.cart,
					userId: this.userId,
					type:'update',
				};
				this.$Request({
					url: this.$Interface.upadateCarts,
					data: send,
				}).then(res => {
					this.$CheckStatus(res)
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.cart {

		.goodsPrice {
			color: red;
			font-size: 36rpx;
		}

		.bottom {
			background-color: white;
			position: fixed;
			width: 100%;
			
			/* #ifdef H5 */
			bottom: 100rpx;
			/* #endif */
			
			/* #ifdef MP-WEIXIN */
			bottom: 0rpx;
			/* #endif */
			
			border-top: #D5D5D5 2rpx solid;
			padding: 0 10rpx;
			display: flex;
			justify-content: space-between;
			height: 90rpx;
			line-height: 90rpx;

			.payBtn {
				margin-left: 10rpx;
			}
		}

		.container {
			margin: 20rpx 10rpx;
			border-radius: 20rpx;
			background-color: white;
			margin-bottom: 110rpx;

			.list {
				padding: 10rpx;

				.row {
					display: flex;
					margin-bottom: 10rpx;

					.shopName {
						font-weight: bold;
					}

					.goodsImg {
						width: 200rpx;
						height: 200rpx;
					}

					.checkbox {
						align-self: center;
					}

					.goodsInfo {
						margin-left: 10rpx;
					}

					.goodsRight {
						display: flex;
						justify-content: space-between;
					}

					.goodsName {
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						margin-bottom: 10rpx;
					}


				}
			}
		}
	}
</style>
