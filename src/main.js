import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import cookies from "vue-cookies"
import firebase from "firebase";
Vue.use(require('vue-filter-pretty-bytes'))
Vue.use(cookies);
import "nprogress/nprogress.css";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyBTEaBrtxi329vwEvYUlAl4pKEk9XJ9PjY",
  authDomain: "ros-cloud-cc711.firebaseapp.com",
  databaseURL: "https://ros-cloud-cc711.firebaseio.com",
  projectId: "ros-cloud-cc711",
  storageBucket: "ros-cloud-cc711.appspot.com",
  messagingSenderId: "175713596436",
  appId: "1:175713596436:web:72844d2b29a01ebaa76301",
  measurementId: "G-ZZXD7PLMCP"
}

if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
