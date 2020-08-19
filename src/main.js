import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.use(require('vue-filter-pretty-bytes'))


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
