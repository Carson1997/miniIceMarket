import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		userInfo: {
			userId:12332,
		},
		cart: {
			//   "10001": {
			//     "detail": {
			//       "img": "https://img.alicdn.com/bao/uploaded/i1/2794371653/O1CN01hukeMS1O57L6SC74K_!!2-item_pic.png",
			//       "goods_params": [
			//         {
			//           "label": "品牌",
			//           "value": "swisse"
			//         },
			//         {
			//           "label": "系列",
			//           "value": "保健品"
			//         },
			//         {
			//           "label": "产地",
			//           "value": "澳大利亚"
			//         },
			//         {
			//           "label": "保质期",
			//           "value": "36个月"
			//         },
			//         {
			//           "label": "规格",
			//           "value": "100粒/150粒/200粒"
			//         },
			//         {
			//           "label": "单位",
			//           "value": "瓶"
			//         },
			//         {
			//           "label": "用法",
			//           "value": "【食用时间】：建议午餐后最饱时或随午餐食用。【食用量】：每天1次，1次2~3片，温水吞服."
			//         },
			//         {
			//           "label": "配料表",
			//           "value": "见包装"
			//         },
			//         {
			//           "label": "生产日期",
			//           "value": "见包装"
			//         },
			//         {
			//           "label": "储存方式",
			//           "value": "室内常温保存"
			//         }
			//       ],
			//       "goods_id": "10001",
			//       "swipers": [
			//         "https://img.alicdn.com/imgextra/i2/2794371653/O1CN01w6DAiT1O57JZVGvyt_!!0-item_pic.jpg_760x760Q50s50.jpg_.webp",
			//         "https://img.alicdn.com/imgextra/i2/2794371653/O1CN01ssO1nN1O57G37iAk1_!!2794371653.jpg_760x760Q50s50.jpg_.webp",
			//         "https://img.alicdn.com/imgextra/i3/2794371653/O1CN01xpjBHr1O57HRdfII0_!!2794371653.jpg_760x760Q50s50.jpg_.webp"
			//       ],
			//       "title": "Swisse斯维诗vd钙娘娘钙澳洲钙+维生素D150片孕妇钙片中老年补钙",
			//       "price": "173.00",
			//       "sold": "1.3万",
			//       "quantity": "97218",
			//       "service": [
			//         "正品保障",
			//         "七天无理由退货",
			//         "破损包退"
			//       ],
			//       "shopImg": "https://dss1.bdstatic.com/6OF1bjeh1BF3odCf/it/u=1645536645,3791462939&fm=74&app=80&f=PNG&size=f121,121?sec=1880279984&t=c07274088dcbf91645222ed93b718411",
			//       "shopName": "swisse官方海外旗舰店",
			//       "goodsScore": "4.9",
			//       "shopScore": "4.9",
			//       "logisticsScore": "4.9",
			// 	  "shopId":10001,
			//     },
			//     "buyNum": 1,
			//     "price": 173
			// }
		},
		collection:[],
	},
	getters: {
	},
	mutations: {
		addCart(state, data) {
			state.cart = [...state.cart, data]
		},
		addCollcet(id){
			state.cart = [...state.collect, id]
		}
	},
	actions: {},
	modules: {}
})
