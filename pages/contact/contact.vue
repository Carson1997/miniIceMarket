<template>
	<view class="pages contact">
		<!-- 轮播图 -->
		<swiper indicator-dots circular autoplay>
			<swiper-item v-for="item in swipers" :key="item.id" @click="seeImg(item.img)">
				<image :src="item.img"></image>
			</swiper-item>
		</swiper>

		<view class="imgh">
			<image src="http://183.239.34.128:808/miniIceMarket/img/contact/logo.png" class="logo"></image>
			<image src="http://183.239.34.128:808/miniIceMarket/img/contact/bg1.jpg" class="bg1"></image>
		</view>


		<view class="introduce">
			{{introduce}}
		</view>

		<view class="info">
			<view>地址：{{address}}</view>
			<view>邮箱：{{email}}</view>
			<view @click="call(phone)">电话：{{phone}}</view>
		</view>

		<map class="map" :latitude="map.latitude" :longitude="map.longitude" scale="18" :markers="map.markers" :callout="map.callout"></map>

		<view class="foot">
			<image src="http://183.239.34.128:808/miniIceMarket/img/contact/foot.png" class="imgf"></image>
			<image src="http://183.239.34.128:808/miniIceMarket/img/contact/earth.png" class="imgE"></image>
		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				swipers: [],
				introduce: "",
				phone: "",
				address: "",
				email: "",
				map: {
					latitude: 22.771745,
					longitude: 113.267820,
					markers: [{
						latitude: 22.771745,
						longitude: 113.267820,
						callout: {
							content: '小冰火人',
							color: 'white',
							borderRadius: 5,
							bgColor: "#ff5500",
							display: 'ALWAYS',
						},
					}],
				},
			}
		},
		onLoad() {
			this.getContactData();
		},
		methods: {
			async getContactData(callBack) {
				// #ifdef H5
				this.$Request({
					url: this.$Interface.contact,
				}).then(res => {
					this.$CheckStatus(res, () => {
						let data = res.data;
						this.swipers = data.swipers;
						this.address = data.address;
						this.email = data.email;
						this.phone = data.phone;
						this.introduce = data.introduce.replace(/`/g, '"');
						callBack && callBack()
					})
				})
				// #endif

				// #ifdef MP-WEIXIN
				let res = require('@/static/json/contact.json');
				let data = res.data;
				this.swipers = data.swipers;
				this.address = data.address;
				this.email = data.email;
				this.phone = data.phone;
				this.introduce = data.introduce.replace(/`/g, '"');
				callBack && callBack()
				// #endif

			},
			call(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				});
			},

			seeImg(current) {
				let urls = this.swipers.map(item => item.img);
				  uni.previewImage({
					  current,
					  urls,
					  "indicator":"number",
					  "loop":true,
				  });
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.contact {
		swiper {
			width: 750rpx;
			height: 380rpx;

			image {
				height: 100%;
				width: 100%;
			}
		}

		.imgh {
			position: relative;
			width: 750rpx;
			height: 380rpx;

			.bg1 {
				width: 750rpx;
				height: 380rpx;
			}

			.logo {
				width: 150rpx;
				height: 150rpx;
				top: 0;
				z-index: 1;
				position: absolute;
			}
		}

		.introduce,.info {
			background-color: #EFF8FF;
			padding: 10rpx;
			font-size: 30rpx;
		}
		
		.introduce{
			text-indent: 60rpx;
			}

		.map {
			width: 750rpx;
			height: 750rpx;
		}

		.foot {
			position: relative;

			.imgf {
				position: absolute;
				bottom: 0;
				z-index: 1;
				width: 750rpx;
				height: 150rpx;
			}

			.imgE {
				width: 750rpx;
				height: 380rpx;
			}
		}



	}
</style>
