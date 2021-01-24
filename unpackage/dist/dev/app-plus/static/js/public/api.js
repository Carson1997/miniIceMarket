let Interfac;
let api;

// #ifdef MP-WEIXIN
api = '/static/json/';
Interfac =  {
	home: api+ 'home.json',
	goods:api+'goods.json',
	contact:api+'contact.json',
	category:api+'category.json',
	goodsDetail:api+'goodsDetail.json',
	upadateCarts:api+'updateCarts.json',
}
// #endif

// #ifdef H5
api = process.env.NODE_ENV === "development" ? "http://localhost/miniMarketData" : "http://"+window.location.host+"/backstage/miniMarketData";
Interface = {
	home: api+ '/index/home/home',
	goods:api+'/index/home/goods',
	contact:api+'/index/home/contact',
	category:api+'/index/home/category',
	goodsDetail:api+'/index/home/goodsDetail',
	upadateCarts:api+'/index/home/updateCarts',
}
// #endif

// #ifdef APP-PLUS
api =  "http://www.cic-valley.com/backstage" + '/miniMarketData';
Interface = {
	home: api+ '/index/home/home',
	goods:api+'/index/home/goods',
	contact:api+'/index/home/contact',
	category:api+'/index/home/category',
	goodsDetail:api+'/index/home/goodsDetail',
	upadateCarts:api+'/index/home/updateCarts',
}
// #endif

export let Interface = Interface;
