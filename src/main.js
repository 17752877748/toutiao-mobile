import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/'

// 导入自己写的插件
import loginPlug from '@/utils/loginPlug/'
Vue.use(loginPlug);

// 时间插件
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn') // 全局使用简体中文
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

Vue.filter('relvTime', value => {
  return dayjs(value).from(dayjs());
})


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
