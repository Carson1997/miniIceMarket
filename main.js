import Vue from 'vue'
import App from './App'
import {Request,Interface,CheckStatus} from '@/static/js/public/config.js'

Vue.config.productionTip = false
Vue.prototype.$Interface = Interface;
Vue.prototype.$CheckStatus = CheckStatus;
Vue.prototype.$Request = Request;


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
