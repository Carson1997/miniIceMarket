<template>
	<view class="pages goods">
		<goods-list :goods_list="goods_list"></goods-list>
		<view class="isOver" v-if="flag">没有更多数据了</view>
		<u-back-top :scroll-top="scrollTop" :customStyle="customStyle" :iconStyle="iconStyle"></u-back-top>
	</view>
</template>

<script>
	import goodsList from '@/components/goosList.vue'
	export default {
		data() {
			return {
				pageIndex: 1,
				pageNum: 0,
				goods_list: [],
				flag: false,
				ifLoad: false,
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
		onLoad() {
			this.getGoodsData()
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onReachBottom() {
			if (this.pageIndex < this.pageNum) {
				this.pageIndex++;
				this.getGoodsData()
			}
		},
		onPullDownRefresh() {
			this.pageIndex = 1;
			this.goods_list = [];
			this.flag = false;
			setTimeout(() => {
				this.getGoodsData(() => {
					uni.stopPullDownRefresh()
				})
			}, 1000)
		},
		methods: {
			async getGoodsData(callBack) {
				let send = {
					pageIndex: this.pageIndex
				};

				// #ifdef H5
				this.$Request({
					url: this.$Interface.goods,
					data: send
				}).then(res => {
					this.$CheckStatus(res, () => {
						let data = res.data;
						let arr = [];
						if (this.pageIndex == 1) {
							this.pageNum = data.pageNum;
							arr = data.goods_list.slice(0, 10);
						}
						if (this.pageIndex == 2) {
							arr = data.goods_list.slice(10, 20);
						}
						this.goods_list = [...this.goods_list, ...arr];
						callBack && callBack();
					})
				})
				// #endif

				// #ifdef MP-WEIXIN
				let res = require('@/static/json/goods.json');
				let data = res.data;
				let arr = [];
				if (this.pageIndex == 1) {
					this.pageNum = data.pageNum;
					arr = data.goods_list.slice(0, 10);
				}
				if (this.pageIndex == 2) {
					arr = data.goods_list.slice(10, 20);
				}
				this.goods_list = [...this.goods_list, ...arr];
				callBack && callBack();
				// #endif

				if (this.goods_list.length == 0 || this.pageIndex == this.pageNum) {
					this.flag = true;
				}
			}
		},
		components: {
			goodsList
		}
	}
</script>

<style lang="scss">
	.iconload {
		margin-right: 10rpx;
	}

	.isOver {
		text-align: center;
		font-size: 28rpx;
		// padding: 10rpx;
		line-height: 60rpx;
		height: 60rpx;
		letter-spacing: 10rpx;
	}
</style>
