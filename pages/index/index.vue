<template>
	<view class="pages home">
		<!-- 搜索 -->
		<search @confirm="search" @input="input" @cancel="cancel" cancelButton="none"></search>

		<!-- 轮播图 -->
		<swiper indicator-dots circular>
			<swiper-item v-for="item in swipers" :key="item.goods_id" @click="goGoodsDetail(item.goods_id)">
				<image :src="item.img"></image>
			</swiper-item>
		</swiper>

		<!-- 导航 -->
		<view class="nav">
			<view v-for="item in nav" class="nav_item" :key="item.title">
				<!-- <view class="iconfont" :class="item.icon"></view> -->
				<!-- <text>{{item.title}}</text> -->
				<image :src="item.img"></image>
			</view>
		</view>

		<!-- 推荐商品列表 -->
		<goodsList :goods_list="goods_list">
			<view class="hot_goods">
				<view class="tit">
					··推荐1商品··
				</view>
			</view>
		</goodsList>

	</view>
</template>

<script>
	import search from '@/components/uni-search-bar/uni-search-bar.vue'
	import goodsList from '@/components/goosList.vue';
	export default {
		data() {
			return {
				searchVal: '',
				swipers: [],
				nav: [],
				goods_list: [],
			}
		},
		components: {
			search,
			goodsList,
		},
		onLoad() {
			this.getSwipers()
		},
		methods: {
			getSwipers() {
				// #ifdef H5
				this.$Request({
					url: this.$Interface.getlunbo,
				}).then(res => {
					this.$CheckStatus(res, () => {
						let data = res.data;
						this.swipers = data.swipers;
						this.nav = data.nav;
						this.goods_list = data.goods_list;
						console.log(data)
					})
				})
				// #endif

				// #ifdef MP-WEIXIN
				let res = require('@/static/json/home.json');
				let data = res.data;
				this.swipers = data.swipers;
				this.nav = data.nav;
				this.goods_list = data.goods_list;
				console.log(data)
				// #endif
			},
			goGoodsDetail(id) {
				uni.navigateTo({
					url: '/pages/goodsDetail/goodsDetail?id?' + id
				})
			},
			search(res) {

			},
			input(res) {
				this.searchVal = res.value
			},
			cancel(res) {
				console.log(res)
			}
		},
	}
</script>

<style lang="scss" scoped>
	/* 1rpx = 0.5px */
	.home {
		swiper {
			width: 750rpx;
			height: 380rpx;

			image {
				height: 100%;
				width: 100%;
			}
		}

		.nav {
			display: flex;
			flex-wrap: wrap;
			background-color: white;

			.nav_item {
				width: 25%;
				text-align: center;

				view {
					width: 120rpx;
					height: 120rpx;
					background: $minColor;
					border-radius: 50%;
					color: white;
					line-height: 120rpx;
					font-size: 50rpx;
					margin: 10rpx auto;
				}

				image {
					width: 150rpx;
					height: 150rpx;
				}

				text {
					font-size: 30rpx;
				}
			}
		}

		.hot_goods {
			.tit {
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				letter-spacing: 40rpx;
				color: $minColor;
				font-weight: bold;
			}
		}
	}
</style>
