import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
<<<<<<< Updated upstream
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'
Vue.use(require('vue-filter-pretty-bytes'))
Vue.use(Autocomplete)

=======
Vue.use(require("vue-filter-pretty-bytes"));
import vuetify from "./plugins/vuetify";
>>>>>>> Stashed changes

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
