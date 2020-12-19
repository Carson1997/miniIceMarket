<template>
	<view>
		<goods-list :goods_list="goods_list"></goods-list>
		<view class="isOver" v-if="flag">---没有数据了---</view>
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
				flag: false
			}
		},
		onLoad() {
			this.getGoodsData()
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
	.isOver {
		text-align: center;
		font-size: 28rpx;
		padding: 10rpx;
		letter-spacing: 10rpx;
	}
</style>
