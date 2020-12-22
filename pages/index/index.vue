<template>
	<view class="pages">
		<!-- <button open-type="getUserInfo" @getuserinfo="getUserInfo"  id="bt">获取用户信息</button> -->
		{{this.$store.state.title}}
<view @click="aa">123</view>

		<!-- 搜索 -->
		<search @confirm="search" @input="input" cancelButton="none"></search>

		<!-- 轮播图 -->
		<swiper indicator-dots circular autoplay>
			<swiper-item v-for="item in swipers" :key="item.goods_id" @click="goGoodsDetail(item.goods_id)">
				<image :src="item.img"></image>
			</swiper-item>
		</swiper>

		<!-- 导航 -->
		<view class="nav">
			<view v-for="item in nav" class="nav_item" :key="item.title" @click="navItemClick(item.url)">
				<view class="iconfont" :class="item.icon"></view>
				<text>{{item.title}}</text>
			</view>
		</view>

		<!-- 推荐商品列表 -->
		<goodsList :goods_list="goods_list">
			<view class="hot_goods">
				<view class="tit">
					··推荐商品··
				</view>
			</view>
		</goodsList>

		<u-back-top :scroll-top="scrollTop" :customStyle="customStyle" :iconStyle="iconStyle"></u-back-top>
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
				scrollTop: 0,
				customStyle: {
					"background-color": "#ff5500",
					width: "60rpx",
					height: "60rpx",
				},
				iconStyle: {
					color: "white"
				}
			}
		},
		components: {
			search,
			goodsList,
		},
		onLoad() {
			this.getHomeData()
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onPullDownRefresh() {
			this.goods_list = [];
			setTimeout(() => {
				this.getHomeData(() => {
					uni.stopPullDownRefresh()
				})
			}, 1000)
		},
		methods: {
			aa() {
				this.$store.state.title ++;
			},

			getUserInfo: function(e) {
				console.log(e.detail)
			},

			async getHomeData(callBack) {
				// #ifdef H5
				this.$Request({
					url: this.$Interface.home,
				}).then(res => {
					this.$CheckStatus(res, () => {
						let data = res.data;
						this.swipers = data.swipers;
						this.nav = data.nav;
						this.goods_list = data.goods_list;
						callBack && callBack()
					})
				})
				// #endif

				// #ifdef MP-WEIXIN
				let res = require('@/static/json/home.json');
				let data = res.data;
				this.swipers = data.swipers;
				this.nav = data.nav;
				this.goods_list = data.goods_list;
				callBack && callBack()
				// #endif

			},
			goGoodsDetail(goods_id) {
				uni.navigateTo({
					url: '/pages/goodsDetail/goodsDetail?goods_id=' + goods_id
				})
			},
			search() {
				console.log(this.searchVal)
			},
			input(res) {
				this.searchVal = res.value
			},
			navItemClick(url) {
				uni.navigateTo({
					url: url,
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	/* 1rpx = 0.5px */
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
			font-size: 36rpx;
		}
	}
</style>
