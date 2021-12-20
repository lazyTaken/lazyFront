import App from './App'
import validate from './common/ysvalidate.js'
Vue.prototype.$validate = validate
Vue.prototype.consturl = 'http://192.168.1.102:8081';
//这是全局使用myRequest
import {myRequest} from 'util/api.js'
//挂载到VUE原型
Vue.prototype.$myRequest = myRequest


// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
