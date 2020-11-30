import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import cookies from "vue-cookies";
Vue.use(require('vue-filter-pretty-bytes'));
Vue.use(cookies);
import "nprogress/nprogress.css";
const _ = require('lodash');
Vue.use(_)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
