import Vue from 'vue'
import App from './frontend/App.vue'
import router from './frontend/router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './frontend/style.scss'


Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
