<template>
	<view>
		<!-- 轮播图 -->
		<!-- <swiper indicator-dots circular>
			<swiper-item v-for="item in swipers" :key="item.id">
				<image :src="item.img"></image>
			</swiper-item>
		</swiper> -->

		<view class="head">
			<image src="../../static/img/contact/logo.png" class="logo"></image>
		</view>

		<view class="introduce">
			<view>
				 	小冰火人成立于2010年，团队起源于2006年，2006年彭利民先生与原媛女士夫妻白手起家，创办了"小冰火人"淘宝C店，开启了"小冰火人"的电商之路。跟阿里巴巴、天猫、京东等其他电商不一样，"小冰火人"这四个字背后有着特别的故事："冰人"源于原媛女士的QQ昵称，表达不愿意加陌生人之意，后来原媛女士又帮其先生注册了QQ，取名为"火人"，两者合并而来的"小冰火人"正是他们的心血结晶。<br/>小冰火人主要业务为电商零售、大数据营销、内容营销、客服外包，现拥有一支专业和系统化的电商团队，总部位于广东顺德，办公面积11000平方，在广州、香港成立了子公司，在杭州、南京、北京设立了办事处。凭借多年来的电商经验，小冰火人在大家电、小家电、数码影音、个护美妆、母婴快消等行业为客户提供优质的电商服务。
			</view>
			 
			
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				swipers: [{
						img: '/static/img/contact/swiper1.jpg',
						id: 1
					},
					{
						img: '/static/img/contact/swiper2.jpg',
						id: 2
					},
					{
						img: '/static/img/contact/swiper3.jpg',
						id: 3
					}
				]
			}
		},
		methods: {}
	}
</script>

<style scoped lang="scss">
	.head {
		background-image: url(../../static/img/contact/bg1.jpg);
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		width: 750rpx;
		height: 380rpx;

		.logo {
			width: 150rpx;
			height: 150rpx;
		}
	}
	
	.introduce{
		background-color: #EFF8FF;
		padding: 10rpx;
		text{
			white-space: pre-wrap;
		}
	}
</style>
