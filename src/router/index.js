import Vue from "vue";
import VueRouter from "vue-router";
import loginVue from "../components/loginVue";
import dashboardWrapper from "../components/dashboardWrapper"
import impressum from '../components/impressum.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: loginVue
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: dashboardWrapper,
  },
  {
    path: "/impressum",
    name: "Impressum",
    component: impressum
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
  linkActiveClass: "active"
});

export default router;
