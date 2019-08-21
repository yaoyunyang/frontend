import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VCharts from 'v-charts'
import axios from 'axios'
import data from './components/GlobalData.vue'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.baseUrl = data.baseUrl
Vue.prototype.cookies = data.cookies
Vue.use(ElementUI)
Vue.use(iView)
Vue.use(VCharts)
Vue.config.productionTip = false
axios.defaults.withCredentials = true
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = 'http://backend.docker.io/api/'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
