
export function Request(options) {
	return new Promise(function(resolve, reject) {
		uni.showLoading({
			mask: true
		});
		uni.request({
			url: options.url,
			data: options.data,
			method: options.method || 'GET',
			timeout: 10000,
			success: res => {
				resolve(res.data)
			},
			fail: err => {
				reject(err)
				uni.showModal({
					content: url + '请求失败' 
				})
			},
			complete: res => {
				uni.hideLoading()
				if (res.statusCode != 200) {
					uni.showModal({
						content: options.url + '请求失败' 
					})
				}
			}
		})
	})
}



let that;
export function CheckStatus(obj, next) {
	if (obj.data == '') {
		obj.data = [];
	}
	if (obj.status == '0') {
		if (typeof(next) == 'function') {
			next();
		}
	}
	if (obj.status == '1') {
		if (typeof(next) == 'function') {
			next();
		}
		if (obj.info != '') {
			uni.showModal({
				content: obj.info
			})
		}
	}
	if (obj.status == '2') {
		if (typeof(next) == 'function') {
			next();
		}
		if (obj.info != '') {
			uni.showModal({
				content: obj.info,
				success: res => {
					if (obj.urlType == 'other') {
						uni.navigateTo({
							url: obj.url
						});
					}
					if (obj.urlType == 'tab') {
						uni.switchTab({
							url: obj.url
						});
					}
				}
			})
		} else if (obj.url != '') {
			if (obj.urlType == 'other') {
				uni.navigateTo({
					url: obj.url
				});
			}
			if (obj.urlType == 'tab') {
				uni.switchTab({
					url: obj.url
				});
			}
		}
	}
}
