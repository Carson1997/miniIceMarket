<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					// #ifdef H5
					Vue.prototype.statusBarH = e.statusBarHeight
					// #endif

					// #ifdef MP-WEIXIN
					let custom = wx.getMenuButtonBoundingClientRect()
					console.log(e)
					console.log(custom)
					Vue.prototype.statusBarH = custom.top
					Vue.prototype.customBarH = custom.height + 4;
					Vue.prototype.customBarW = custom.left;
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
