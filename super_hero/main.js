import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$address = 'http://localhost:3000'
const app = new Vue({
    ...App
})
app.$mount()
