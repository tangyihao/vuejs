import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入 mint-ui 组件库
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// 导入mui框架样式
import './lib/mui/css/mui.css'
import './lib/mui/css/mui-icons-extra.css'
import './lib/mui/fonts/mui-icons-extra.ttf'
//  导入axios配置文件
import axios from './axios.js'
// 导入auth.js 用户认证
import auth from './auth.js'
// 导入vue-proview
import VuePreview from 'vue-preview'

// 注册vue-preview
Vue.use(VuePreview)
// 注册auth
Vue.use(auth)
// 注册mint-ui
Vue.use(MintUI)
// 注册axios
Vue.use(axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
