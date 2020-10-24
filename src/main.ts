import Vue from 'vue'
import App from './frontend/App.vue'
import router from './frontend/router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
