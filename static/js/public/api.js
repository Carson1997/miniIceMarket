
// #ifdef MP-WEIXIN
let api = '/static/json/'
export let Interfac =  {
	home: api+ 'home.json',
	goods:api+'goods.json',
	contact:api+'contact.json',
	category:api+'category.json',
	goodsDetail:api+'goodsDetail.json',
	upadateCarts:api+'updateCarts.json',
}
// #endif

// #ifdef H5
// let host =  "http://www.cic-valley.com/backstage";
let head = process.env.NODE_ENV === "development" ? "http://localhost" : window.location.host;
let api = head + '/miniMarketData';
export let Interface = {
	home: api+ '/index/home/home',
	goods:api+'/index/home/goods',
	contact:api+'/index/home/contact',
	category:api+'/index/home/category',
	goodsDetail:api+'/index/home/goodsDetail',
	upadateCarts:api+'/index/home/updateCarts',
}
// #endif

// #ifdef APP-PLUS
let head =  "http://www.cic-valley.com/backstage";
let api = head + '/miniMarketData';
export let Interface = {
	home: api+ '/index/home/home',
	goods:api+'/index/home/goods',
	contact:api+'/index/home/contact',
	category:api+'/index/home/category',
	goodsDetail:api+'/index/home/goodsDetail',
	upadateCarts:api+'/index/home/updateCarts',
}
// #endif

