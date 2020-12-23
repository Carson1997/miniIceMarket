import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		userInfo: {},
		cart: [],
		collect:[],
	},
	getters: {
		cart_num: state => {
			return state.cart.length;
		}
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
