import Vue from "vue";
import App from "./frontend/App.vue";
import router from "./frontend/router";
import { IconsPlugin, NavbarPlugin,LayoutPlugin, TablePlugin } from "bootstrap-vue";
import "./frontend/style.scss";

Vue.config.productionTip = false;
Vue.use(NavbarPlugin);
Vue.use(LayoutPlugin);
Vue.use(IconsPlugin);
Vue.use(TablePlugin);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
