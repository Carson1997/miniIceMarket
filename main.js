import Vue from 'vue'
import App from './App'
import store  from "./store"
import {Request,CheckStatus} from '@/static/js/public/config.js'
import {Interface} from '@/static/js/public/api.js'
import uView from "uview-ui";
Vue.use(uView);

Vue.config.productionTip = false
Vue.prototype.$Interface = Interface;
Vue.prototype.$CheckStatus = CheckStatus;
Vue.prototype.$Request = Request;


App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
