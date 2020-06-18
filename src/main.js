import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入element组件
import '@/plugins/elementUI'
// 导入axios组件
import '@/utils/myhttp'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
