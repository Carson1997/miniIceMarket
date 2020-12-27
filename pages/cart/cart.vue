<template>
	<view class="cart">
		<u-swipe-action v-for="(item,index) in cart_arr" :key="index" :options="options" class="container" :index="index"  @click="click" @open="open" :show="item.show">
			<view class="list">
				<view class="row">
					<text class="shopName">{{item.detail.shopName}}</text>
				</view>
				<view class="row">

				</view>
			</view>

		</u-swipe-action>
	</view>

</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		computed: {
			...mapState(['cart']),
		},
		data() {
			return {
				cart_arr: [],
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d',
					}
				}],
			}
		},
		onLoad() {
			this.initCart()
		},
		onShow() {
			console.log(this.cart_arr)
		},
		methods: {
			initCart() {
					let arr = Object.values(this.cart)
					for (let i in arr) {
						arr[i].show = false;
					}
					arr = [...arr, ...arr];
					this.cart_arr = arr;
			},
			click(index, index1) {
				
			},
			open(index) {
                let arr = JSON.parse(JSON.stringify(this.cart_arr));
				arr[index].show = true;
				console.log(arr)
				arr.map((val, idx) => {
					if (index != idx) arr[idx].show = false;
				})
				console.log(arr)
				this.cart_arr = arr;
			}
		}
	}
</script>

<style scoped lang="scss">
	.cart {

		.container {
			margin: 20rpx 10rpx;
			border-radius: 10rpx;
			background-color: white;

			.list {
				padding: 10rpx;

				.row {
					display: flex;

					.shopName {
						font-weight: bold;
					}
				}
			}
		}
	}
</style>
