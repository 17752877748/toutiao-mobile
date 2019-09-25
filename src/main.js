import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/'

// 一次性导入所有组件vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

// 用于设置 rem 基准值
import 'amfe-flexible'

// 导入base.less
import './style/base.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
