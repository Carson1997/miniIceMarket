<template>
	<view>
		<slot></slot>
		<view class="goods_list">
			<view class="goods_item" @click="goGoodsDetail(item.goods_id)" v-for="item in goods_list" :key="item.goods_id">
				<image :src="item.img"></image>
				<view class="price">
					<text>￥{{item.price}}</text>
					<text v-if="item.orPrice">￥{{item.orPrice}}</text>
				</view>
				<view class="name">
					{{item.title}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['goods_list'],
		methods: {
			goGoodsDetail(id) {
				uni.navigateTo({
					url: '/pages/goodsDetail/goodsDetail?goods_id=' + id
				})

			}
		}
	}
</script>

<style scoped lang="scss">
	.goods_list {
		display: flex;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 15rpx;

		.goods_item {
			background-color: white;
			width: 355rpx;
			margin-bottom: 15rpx;
			border-radius: 20rpx;

			image {
				// width: 355rpx;
				// height: 355rpx;
				width: 95%;
				height: 355rpx;

				margin: 10rpx;
			}

			.price {
				padding: 0 10rpx;
				color: red;
				font-size: 36rpx;
				text:nth-child(2) {
					color: #C0C0C0;
					font-size: 28rpx;
					margin-left: 10rpx;
					text-decoration: line-through;
				}
			}

			.name {
				padding: 10rpx;
				font-size: 28rpx;
				line-height: 28rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				line-height: 40rpx;
			}
		}
	}
</style>
