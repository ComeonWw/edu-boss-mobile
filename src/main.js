import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入lib-flexible
import 'amfe-flexible'

// 引入vant
import Vant from 'vant'
// 引入样式文件
import 'vant/lib/index.css'

// 将vant 注册为Vue插件
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
