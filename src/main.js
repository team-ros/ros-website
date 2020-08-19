import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'
Vue.use(require('vue-filter-pretty-bytes'))
Vue.use(Autocomplete)


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
