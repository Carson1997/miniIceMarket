<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					Vue.prototype.statusBar = e.statusBarHeight
					// #ifndef MP
					if (e.platform == 'android') {
						Vue.prototype.customBar = e.statusBarHeight + 50
					} else {
						Vue.prototype.customBar = e.statusBarHeight + 45
					}
					// #endif

					// #ifdef MP-WEIXIN
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.customBar = custom.bottom + custom.top - e.statusBarHeight
					// #endif

					// #ifdef MP-ALIPAY
					Vue.prototype.customBar = e.statusBarHeight + e.titleBarHeight
					// #endif
				}
			})
		},
		onShow: function() {},
		onHide: function() {}
	}
</script>

<style lang="scss">
	@import url("@/static/font/iconfont.css");

	html,
	body,
	.pages {
		width: 100%;
		height: 100%;
		background-color: $bgColor;
	}
</style>
